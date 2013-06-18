#pragma strict

function Start () {

}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "Play"){
				Application.LoadLevel("Opening");
			}
			else if(hit.transform.name == "Help"){
				Application.LoadLevel("Tutorial");
			}
			else{
				Debug.Log(hit.transform.name);
			}
		}		
	}
}