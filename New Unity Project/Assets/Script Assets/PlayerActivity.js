#pragma strict

var end: Vector3;
var isMoving = false;
var obj: Vector3;
var dest: Rect;
var player: Rect; 


function Start () {
	obj = GameObject.Find("Player").transform.position;
	
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "Map"){			
				end = ray.origin;
				dest = new Rect(ray.origin.x, ray.origin.y, 1, 1);
			}
		}
	}
	if(!(obj == end)){
		var dir = -(GameObject.Find("Player").transform.position - end).normalized;
		GameObject.Find("Player").transform.position = GameObject.Find("Player").transform.position + dir;
		Debug.Log(GameObject.Find("Player").transform.position);
	}
	else{
		isMoving = false;
		Debug.Log("Arrived at destination");
	}
	
}