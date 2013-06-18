#pragma strict

var main: GameObject;
main = GameObject.Find("tut_main");
var BG1: Texture;
var BG2: Texture;

function Start () {
	BG1 = Resources.LoadAssetAtPath("Assets/Device_Assets/UI/tut1.png", Texture);
	BG2 = Resources.LoadAssetAtPath("Assets/Device_Assets/UI/tut2.png", Texture);
	GameObject.Find("left_nav").renderer.enabled=false;
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "right_nav"){
				main.renderer.material.mainTexture = BG2;
				GameObject.Find("right_nav").renderer.enabled=false;
				GameObject.Find("left_nav").renderer.enabled=true;
			}
			if(hit.transform.name == "left_nav"){
				main.renderer.material.mainTexture = BG1;
				GameObject.Find("left_nav").renderer.enabled=false;
				GameObject.Find("right_nav").renderer.enabled=true;
			}
			else if(hit.transform.name == "exit"){
				Application.LoadLevel("title");
			}
		}
	}
}