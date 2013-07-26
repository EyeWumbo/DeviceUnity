

var end: Vector3;
var isMoving = false;
var dir: Vector3;
var dest: Vector3;
var player: Rect; 
var walks = [];

function Start () {
	var img: Texture2D;
	img = Resources.LoadAssetAtPath("Assets/Device_Assets/objects/hero4.png", Texture2D);
	for(var i = 0; i < 8; i ++){
		var tmp = new Texture2D(3 * img.width / 5, img.height / 12);
		tmp.SetPixels(img.GetPixels(0, (4 + i) * img.height / 12, 3 * img.width / 5, img.height / 12));
		tmp.Apply();
		var anim: Texture2D[];
		anim = [];
		for(var j = 0; j < 3; j ++){
			var tmp2 = new Texture2D(img.width / 5, img.height / 12);
			tmp2.SetPixels(tmp.GetPixels(j * tmp.width / 3, 0, tmp.width / 3, tmp.height));
			tmp2.Apply();
			anim.push(tmp2);
		}
		walks.push(anim);
	}
	GameObject.Find("Player").renderer.material.mainTexture = walks[0][0];
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		isMoving = true;
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "Map"){	
				ray.origin.z = 1;		
				end = ray.origin;
				dest = new Vector3(ray.origin.x, ray.origin.y, 0);
			}
		}
	}
	if(!player.Contains(dest) && isMoving){
		var temp = GameObject.Find("Player");
		dir = -(temp.transform.position - end).normalized;
		GameObject.Find("Player").transform.position = temp.transform.position + dir;
		player = new Rect(temp.transform.position.x, temp.transform.position.y, 5, 5);
	}
	else{
		isMoving = false;
	}
}