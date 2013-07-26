#pragma strict

var obj: GameObject;
var button: Texture2D;
var up: Texture2D;
var down: Texture2D;
var setter: GameObject;
var isDown = false;
setter = GameObject.Find("Nuke");


function Start () {
	button = Resources.LoadAssetAtPath("Assets/Device_Assets/UI/bomb.png", Texture2D);
	up = new Texture2D(button.width/2, button.height);
	down = new Texture2D(button.width/2, button.height);
	up.SetPixels(button.GetPixels(0, 0, button.width/2, button.height));
	down.SetPixels(button.GetPixels(button.width/2, 0, button.width/2, button.height));
	up.Apply();
	down.Apply();
	setter.renderer.material.mainTexture = up;
}


function Update () {
	if(Input.GetMouseButtonDown(0)){
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "Nuke"){
				setter.renderer.material.mainTexture = down;
				Debug.Log("Down");
				isDown = true;
			}
		}
	}
	if(Input.GetMouseButtonUp(0) && isDown){
		setter.renderer.material.mainTexture = up;
		Debug.Log("Up");
		isDown = false;
	}
}