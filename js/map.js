
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
zeData.human_spawns = [];
zeData.zombie_spawns = [];
zeData.safe_zone = [];
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

// General Setting.
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
    $('#mapLockWorldTime').val(mapData.lock_world_time);
    $('#mapWorldTime').val(mapData.world_time);
    updateForumsZE();
}

function updateForumsZE()
{
    $('#zeGoalRemaining').val(mapData.zombie_escape.goal_remaining);
    $('#zeZombieSpawnTime').val(mapData.zombie_escape.zombie_spawn_time);
    $('#zeZombieRatio').val(mapData.zombie_escape.zombie_ratio);

}

$(function() {

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

    $('#mapLockWorldTime').change(function() {
        var checked = $(this).is(':checked');
        mapData.lock_world_time = checked;
    });

    $('#mapGameMode').change(function() {
        changeGameMode($(this).val());
    });

});

function addRegion(region, sizeNode, formNode) {
        region.unshift(new Region());
        var size = region.length;
        sizeNode.val(size);
//        var regionForm = createRegionForm(size);
//        formNode.append(regionForm);
}

function removeRegion(region, sizeNode, formNode) {
        region.shift();
        var size = region.length;
        sizeNode.val(size);
//        formNode.remove();
}

// ZombieEscape
$(function() {

    $('#zeHumanSpawnSize .ze-region-add').click(function(event) {
        var sizeNode = getZESizeNode($(this));
        var ze = mapData.zombie_escape;
        var region = ze.human_spawns;

        addRegion(region, sizeNode, $('#zeHumanSpawnRegionList'));
    });

    $('#zeHumanSpawnSize .ze-region-remove').click(function(event) {
        var sizeNode = getZESizeNode($(this));
        var ze = mapData.zombie_escape;
        var region = ze.human_spawns;

        var indexNode = $('#zeHumanSpawnRegionList #ze-region-index-' + (region.length) + '');
        removeRegion(region, sizeNode, indexNode);
    });

    $('#zeZombieSpawnSize .ze-region-add').click(function(event) {
        var sizeNode = getZESizeNode($(this));
        var ze = mapData.zombie_escape;
        var region = ze.zombie_spawns;

        addRegion(region, sizeNode, $('#zeHumanSpawnRegionList'));
    });

    $('#zeZombieSpawnSize .ze-region-remove').click(function(event) {
        var sizeNode = getZESizeNode($(this));
        var ze = mapData.zombie_escape;
        var region = ze.zombie_spawns;

        var indexNode = $('#zeZombieSpawnRegionList #ze-region-index-' + (region.length) + '');
        removeRegion(region, sizeNode, indexNode);
    });

    $('#zeSafeZoneSize .ze-region-add').click(function(event) {
        var sizeNode = getZESizeNode($(this));
        var ze = mapData.zombie_escape;
        var region = ze.safe_zone;

        addRegion(region, sizeNode, $('#zeZombieSpawnRegionList'));
    });

    $('#zeSafeZoneSize .ze-region-remove').click(function(event) {
        var sizeNode = getZESizeNode($(this));
        var ze = mapData.zombie_escape;
        var region = ze.safe_zone;

        var indexNode = $('#zeSafeZoneRegionList #ze-region-index-' + (region.length) + '');
        removeRegion(region, sizeNode, indexNode);
    });

    $('#zeGoalRemaining').on('input', function(event) {
        mapData.zombie_escape.goal_remaining = $(this).val();
    });

    $('#zeZombieSpawnTime').on('input', function(event) {
        mapData.zombie_escape.zombie_spawn_time = $(this).val();
    });

    $('#zeZombieRatio').on('input', function(event) {
        mapData.zombie_escape.zombie_ratio = $(this).val();
    });

});

function getZESizeNode(node) {
    return node.parents('.ze-region-group').find('.ze-region-size');
}

function changeGameMode(val) {
    $('#game_mode_ze').hide();
    switch (val) {
    case 'ze':
        $('#game_mode_ze').show();
        break;
    }
}

function createRegionForm(index_num) {
    var html = '';
    html += '<div id="ze-region-index-' + index_num + '" class="card ze-region-index">';
    html += '   <div class="card-header">SpawnPoint ' + index_num + '</div>';
    html += '   <div class="card-body">';
    html += '       <div class="input-group">';
    html += '           <div class="input-group-prepend">';
    html += '               <div class="input-group-text">min</div>';
    html += '           </div>';
    html += '           <input type="number" aria-label="x" value="0.0" step="0.1" class="form-control"/>';
    html += '           <input type="number" aria-label="y" value="0.0" step="0.1" class="form-control"/>';
    html += '           <input type="number" aria-label="z" value="0.0" step="0.1" class="form-control"/>';
    html += '       </div>';
    html += '       <div class="input-group">';
    html += '           <div class="input-group-prepend">';
    html += '               <div class="input-group-text">max</div>';
    html += '           </div>';
    html += '           <input type="number" aria-label="x" value="0.0" step="0.1" class="form-control"/>';
    html += '           <input type="number" aria-label="y" value="0.0" step="0.1" class="form-control"/>';
    html += '           <input type="number" aria-label="z" value="0.0" step="0.1" class="form-control"/>';
    html += '       </div>';
    html += '   </div>'
    html += '</div>';
    return html;
}
