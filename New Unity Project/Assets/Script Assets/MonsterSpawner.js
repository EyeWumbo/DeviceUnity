#pragma strict
import System.Collections.Generic;


var count = 0;
var timer = 500;
var shuffle: Stack.<boolean>;

function Start () {
	shuffle = new Stack.<boolean>();
	populateShuffle();
}

function Update () {
	if(count < 5){
		timer -= Time.deltaTime;
		if(timer <= 0){
			timer = 500;
			count += 1;
			var plane : GameObject;
			plane = GameObject.CreatePrimitive(PrimitiveType.Plane);
			plane.name = "Monster";			
			plane.transform.position = transform.position + spawnMonster();
			plane.transform.rotation = transform.rotation;
			plane.AddComponent("MonsterActivity");
			plane.renderer.material.mainTexture = Resources.LoadAssetAtPath("Assets/Device_Assets/FritoLay.png", Texture2D);
		}
	}
}

function subCount() {
	count -= 1;
}

function populateShuffle(){
	var tmpCount = 0;
	while(shuffle.Count < 6){
		var tmp = Random.value < 0.5 ? true : false;
		if(tmp == true){
			tmpCount += 1;
		}
		if(tmpCount > 3){
			shuffle.Push(false);
		}
		else{
			shuffle.Push(true);
		}
	}
}

function spawnMonster(){
	var x = 0;
	var y = 0;
	if(shuffle.Pop()){
		x = shuffle.Pop() ? -200 : 200;
		y = Random.Range(-100.0, 100.0);
	}
	else{
		x = Random.Range(-200, 200);
		y = shuffle.Pop() ? -100.0 : 100.0;
	}
	if(shuffle.Count == 0){
		populateShuffle();
	}
	return Vector3(x, y, -1);
}