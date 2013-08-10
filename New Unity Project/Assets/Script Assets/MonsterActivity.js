#pragma strict

var dir : Vector3;
var atDevice = false;
var isDying = false;
var timer = 150;

function Start () {
	transform.gameObject.AddComponent(Rigidbody);
	rigidbody.mass = 5;
	rigidbody.useGravity = false;
	rigidbody.constraints = RigidbodyConstraints.FreezePositionZ | RigidbodyConstraints.FreezeRotation;
	transform.gameObject.AddComponent(BoxCollider);
}

function Update () {
	if(atDevice == false && !isDying){
		dir = (transform.localPosition - GameObject.Find("Device").transform.localPosition).normalized;
		transform.localPosition -= dir * 0.5;
	}
	if(isDying){
		timer -= Time.deltaTime;
		if(timer <= 0){
			Destroy(gameObject);
		}
	}
}

function OnCollisionEnter(collide : Collision){
	if(collide.transform.name == "Device"){
		atDevice = true;
		dir = Vector3(0,0,0);
	}
}

function OnCollisionStay(collide : Collision){
	if(collide.transform.name == "Monster"){

	}
}

function setDestroy(){
	isDying = true;
}