
Region = function() {
    this.locations = [new Position(0, 0, 0), new Position(0, 0, 0)];
}

Position = function(x, y, z) {
    this.world = null;
    this.x = x;
    this.y = y;
    this.z = z;
}

var mapData = new Object();
mapData.id = "hoge";
mapData.name = "Hoge";
mapData.author = "mr_crafter";
mapData.schematic = "hoge";
mapData.vote = "hoge.vote";
mapData.min_player = 10;
mapData.max_player = 30;
mapData.round = 2;
mapData.round_time = 900;
mapData.world_time = 4000;
mapData.lock_world_time = false;
mapData.single = true;

var zeData = new Object();
zeData.human_spawns = [new Region()];
zeData.zombie_spawns = [new Region()];
zeData.safe_zone = [new Region()];
zeData.goal_remaining = 20;
zeData.zombie_ratio = 4;
zeData.zombie_spawn_time = 15;

mapData.zombie_escape = zeData;

function outPutMapData() {
    var text = JSON.stringify(mapData, null, 4);
    console.log(text);
    $("#outPutTextArea").val(text);
}

function copyClipboard(id) {
    $(id).select();
    document.execCommand('copy');
}
