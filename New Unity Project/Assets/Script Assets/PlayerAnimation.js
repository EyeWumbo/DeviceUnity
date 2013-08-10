
var end: Vector3;
var isMoving = false;
var dest: Vector3;
var dir: Vector3;
var player: Rect; 
var walks: Array;
var purging = false;
var target: GameObject;

function Start () {
	var img: Texture2D;
	walks = new Array();
	img = Resources.LoadAssetAtPath("Assets/Device_Assets/objects/hero4.png", Texture2D);
	for(var i = 0; i < 8; i ++){
		var tmp = new Texture2D(3 * img.width / 5, img.height / 12);
		tmp.SetPixels(img.GetPixels(0, (4 + i) * img.height / 12, 3 * img.width / 5, img.height / 12));
		tmp.Apply();
		var anim = new Array();
		for(var j = 0; j < 3; j ++){
			var tmp2 = new Texture2D(img.width / 5, img.height / 12);
			tmp2.SetPixels(tmp.GetPixels(j * tmp.width / 3, 0, tmp.width / 3, tmp.height));
			tmp2.Apply();
			anim.Push(tmp2);
		}
		walks.Push(anim);
	}
	GameObject.Find("Player").renderer.material.mainTexture = walks[0][0];
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		isMoving = true;
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "Map"|| hit.transform.name == "Monster"){	
				ray.origin.z = 1;		
				end = ray.origin;
				if(hit.transform.name == "Monster"){
					purging = true;
					target = hit.transform.gameObject;
				}
				dir = (GameObject.Find("Player").transform.position - end).normalized;
			}
		}
	}
	if(isMoving && (GameObject.Find("Player").transform.position - end).magnitude >= 1){
		GameObject.Find("Player").transform.position = GameObject.Find("Player").transform.position - dir;
	}
	else{
		isMoving = false;
	}
}

function getSpeed(){
	return dir;
}

function slowSpeed(num){
	dir = dir * num;
}

function OnCollisionEnter(collide : Collision){
	if(purging && collide.gameObject == target){
		GameObject.Find("Map").GetComponent("MonsterSpawner").subCount();
		target.GetComponent("MonsterActivity").setDestroy();		
	}
}