
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
    $("#outPutTextArea").val(text);
}

function copyClipboard(id) {
    $(id).select();
    document.execCommand('copy');
}

function inputTextField(id) {
    var text = $(id).val();
    mapData = JSON.parse(text);
    updateForums();
}

function updateForums() {
    $("#mapId").val(mapData.id);
    $("#mapName").val(mapData.name);
    $("#mapAuthor").val(mapData.author);
    $("#mapPlayerMax").val(mapData.max_player);
    $("#mapPlayerMin").val(mapData.min_player);
    $("#mapRound").val(mapData.round);
    $("#mapRoundTime").val(mapData.round_time);
    $("#mapSchematic").val(mapData.schematic);
    $("#mapVote").val(mapData.vote);
}

function initFunctions() {

    $('#mapId').on('input', function(event) {
        mapData.id = $('#mapId').val();
    });

    $('#mapName').on('input', function(event) {
        mapData.name = $('#mapName').val();
    });


    $('#mapAuthor').on('input', function(event) {
        mapData.author = $('#mapAuthor').val();
    });

    $('#mapPlayerMax').on('input', function(event) {
         mapData.max_player = $('#mapPlayerMax').val();
    });

    $('#mapPlayerMin').on('input', function(event) {
        mapData.min_player = $('#mapPlayerMin').val();
    });

    $('#mapRound').on('input', function(event) {
        mapData.round = $('#mapRound').val();
    });

    $('#mapRoundTime').on('input', function(event) {
        mapData.round_time = $('#mapRoundTime').val();
    });

    $('#mapSchematic').on('input', function(event) {

        mapData.schematic = $('#mapSchematic').val();

        // voteの方にも同時に変更する
        $('#mapVote').val($('#mapSchematic').val() + ".vote");
        mapData.vote = $('#mapVote').val();

    });

    $('#mapVote').on('input', function(event) {
        mapData.vote = $('#mapVote').val();
    });

}
