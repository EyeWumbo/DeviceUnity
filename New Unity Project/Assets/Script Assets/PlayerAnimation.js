var playerWalkSpeed = 1;

var playerObject:GameObject;



var end: Vector3;
var isMoving = false;
var dir: Vector3;
var dest: Vector3;
var player: Rect; 
<<<<<<< HEAD
var walks = [];
=======
<<<<<<< HEAD
var walkAnimations: Array;
var purging = false;
var target: GameObject;
=======
var walks = [];
>>>>>>> de3b6f403ed832fdf54672f26ec53b0886a42618

/////Number of update cycles before it moves on to the next animation frame
final var ANIMATION_DELAYPERFRAME = 3;

/////Number of columns and rows
final var SPRITESHEET_HEROES_X = 6;
final var SPRITESHEET_HEROES_Y = 12;

/////Which rows have the character facing which direction
/////For some reason, they're all backwards
final var SPRITESHEET_Y_RIGHT = 7;
final var SPRITESHEET_Y_UPRIGHT = 6;
final var SPRITESHEET_Y_UP = 5;
final var SPRITESHEET_Y_UPLEFT = 4;
final var SPRITESHEET_Y_LEFT = 3;
final var SPRITESHEET_Y_DOWNLEFT = 2;
final var SPRITESHEET_Y_DOWN = 1;
final var SPRITESHEET_Y_DOWNRIGHT = 0;

/////How many columns have the character walking (the last column is the character standing still)
final var SPRITESHEET_X_NUMWALK = 5;
final var SPRITESHEET_X_IDLE = SPRITESHEET_X_NUMWALK;

function Start(){
	playerObject = GameObject.Find("Player");
>>>>>>> temp

	var img: Texture2D;
<<<<<<< HEAD
=======
<<<<<<< HEAD
	walkAnimations = new Texture2D[SPRITESHEET_HEROES_Y];
	img = Resources.LoadAssetAtPath("Assets/Device_Assets/objects/hero.png", Texture2D);
	var singlewidth = img.width/SPRITESHEET_HEROES_X;
	var singleheight = img.height/SPRITESHEET_HEROES_Y;
	for(var y = 0; y < SPRITESHEET_HEROES_Y; y++){
		var animrow = new Texture2D[SPRITESHEET_HEROES_X];
		for(var x = 0; x < SPRITESHEET_HEROES_X; x++){
			var tempimg = new Texture2D(singlewidth,singleheight);
			tempimg.SetPixels(img.GetPixels(singlewidth*x,singleheight*y,singlewidth,singleheight));
			tempimg.Apply();
			animrow[x] = tempimg;
		}
		walkAnimations[y] = animrow;
=======
>>>>>>> temp
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
<<<<<<< HEAD
=======
>>>>>>> de3b6f403ed832fdf54672f26ec53b0886a42618
>>>>>>> temp
	}
	
	playerObject.renderer.material.mainTexture = walkAnimations[SPRITESHEET_Y_UP][0];
	playerTextureY = 0;//For testing, since all of the numbers are messed up. 0 seems to be down-right
}

var playerRunFrameDelay:int = 0;
var playerRunCycle:int;//Which column will be drawn when running (last column is only drawn when idle)
var playerRunCycleAddition:int = 1;
var playerTextureY;//Which row will be drawn (according to the direction the character is facing; also currently not working correctly)
function Update(){
	if(Input.GetMouseButtonDown(0)){
		isMoving = true;
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "Map"){	
				ray.origin.z = 1;		
				end = ray.origin;
<<<<<<< HEAD
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
=======
<<<<<<< HEAD
				if(hit.transform.name == "Monster"){
					purging = true;
					target = hit.transform.gameObject;
				}
				dir = (end - playerObject.transform.position).normalized*playerWalkSpeed;
			}
		}
	}
	
	if(isMoving){
		if((playerObject.transform.position - end).magnitude < dir.magnitude){
			playerObject.transform.position = end;
			isMoving = false;
		}else{
			playerObject.transform.position = playerObject.transform.position + dir;
			
			playerTextureY = GetPlayerTextureYFromAngle(toAngle(end-playerObject.transform.position));
			
			playerObject.renderer.material.mainTexture = walkAnimations[playerTextureY][playerRunCycle];
			if(playerRunFrameDelay == ANIMATION_DELAYPERFRAME){
				if(playerRunCycle == SPRITESHEET_X_NUMWALK-1)
					playerRunCycleAddition = -1;
				else if(playerRunCycle == 0)
					playerRunCycleAddition = 1;
				playerRunCycle += playerRunCycleAddition;//(playerRunCycle+1)%SPRITESHEET_X_NUMWALK;
				playerRunFrameDelay = 0;
			}else{
				playerRunFrameDelay++;
			}
		}
	}else{
		playerObject.renderer.material.mainTexture = walkAnimations[playerTextureY][SPRITESHEET_X_IDLE];
		playerRunCycle = 0;
	}
}

function GetPlayerTextureYFromAngle(angle){
	angle = angle/PI*8;
	if(angle < 9){
		if(angle < 3){
			if(angle < 1)
				return SPRITESHEET_Y_RIGHT;
			return SPRITESHEET_Y_UPRIGHT;
		}else if(angle < 5)
			return SPRITESHEET_Y_UP;
		else if(angle < 7)
			return SPRITESHEET_Y_UPLEFT;
		return SPRITESHEET_Y_LEFT;
	}else if(angle < 13){
		if(angle < 11)
			return SPRITESHEET_Y_DOWNLEFT;
		return SPRITESHEET_Y_DOWN;
	}else if(angle < 15)
		return SPRITESHEET_Y_DOWNRIGHT;
	return SPRITESHEET_Y_RIGHT;
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

/////We should really have a global static class to handle this stuff
final var PI = 3.14159265;
function toAngle(v){
    if(v.x == 0)
        return v.y >= 0 ? PI/2 : PI*3/2;

    if(v.y == 0)
        return v.x < 0 ? PI : 0;

    var r = Mathf.Atan(v.y/v.x);
    r = v.x < 0 ? PI+r : r;
    return r < 0 ? r+PI*2 : r;
}
=======
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
>>>>>>> de3b6f403ed832fdf54672f26ec53b0886a42618
>>>>>>> temp
