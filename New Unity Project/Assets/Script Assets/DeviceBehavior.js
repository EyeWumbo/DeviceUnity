#pragma strict

var player : PlayerAnimation;
var dir : Vector3;

function Start () {
	
}

function Update () {
	player = GameObject.Find("Player").GetComponent("PlayerAnimation");	
}

function OnCollisionEnter(collide : Collision){
	if(collide.transform.name == "Player"){
		if(collide.contacts[0].normal.x != 0){
			transform.localPosition.x -= player.getSpeed().x;
		}
		if(collide.contacts[0].normal.y != 0){
			transform.localPosition.y += player.getSpeed().y;
		}
	}
}

function OnCollisionStay(collide : Collision){
	if(collide.transform.name == "Player"){
		if(collide.contacts[0].normal.x != 0){
			transform.localPosition.x -= player.getSpeed().x;
		}
		else if(collide.contacts[0].normal.y != 0){
			transform.localPosition.y += player.getSpeed().y;
		}
	}
}