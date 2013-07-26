#pragma strict

var main: GameObject;
var count = 0;

function Start () {
	main = GameObject.Find("Sequence");
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		if(count == 5){
			Application.LoadLevel("Game");
		}
		else{
			count ++;
			main.renderer.material.mainTexture = Resources.LoadAssetAtPath("Assets/Device_Assets/Cutscenes/Scene" + count + ".png", Texture);
		}
	}
}
