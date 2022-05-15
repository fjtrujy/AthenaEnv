//System.threadCopyFile(src, dst + "/" + src);
//var prog = System.getFileProgress(); 

file_manager = new App();
file_manager.data = [0, 0, 0, 1];

var path = "host:"
var file = System.listDir(path);

var src = "";
var srcfile = "";
var dst = "";
var fileop = 0;

file_manager.process = function() {
    if (Pads.check(pad, PAD_CROSS) && !Pads.check(oldpad, PAD_CROSS)){
        if(file_manager.data[3] == 1){
            path = path + "/" + file[file_manager.data[0]].name + "/";
            file = System.listDir(path);
        }
        if(file_manager.data[2] == 1){
            switch (file_manager.data[1]) {
                case 0:
                    fileop = 0;
                    src = path + file[file_manager.data[0]].name;
                    srcfile = file[file_manager.data[0]].name;
                    file_manager.data[2] ^= 1;
                    file_manager.data[3] ^= 1;
                    break;
                case 1:
                    fileop = 1;
                    src = path + file[file_manager.data[0]].name;
                    srcfile = file[file_manager.data[0]].name;
                    file_manager.data[2] ^= 1;
                    file_manager.data[3] ^= 1;
                    break;
                case 2:
                    dst = path + srcfile;
                    switch (fileop){
                        case 0:
                            System.copyFile(src, dst);
                            break;
                        case 1:
                            System.moveFile(src, dst);
                            break;
                    };
                    file_manager.data[2] ^= 1;
                    file_manager.data[3] ^= 1;
                    break;
                case 3:
                    System.rename(path+file[file_manager.data[0]].name, path+keyboard.getinput());
                    break;
                case 4:
                    System.removeFile(path + file[file_manager.data[0]].name);
                    file_manager.data[2] ^= 1;
                    file_manager.data[3] ^= 1;
                    break;
            }
            file = System.listDir(path);
        }
    };
    if (Pads.check(pad, PAD_R1) && !Pads.check(oldpad, PAD_R1)){
        file_manager.data[2] ^= 1;
        file_manager.data[3] ^= 1;
    };
    if(file_manager.data[2] == 1){
        file_manager.data[1] = process_list_commands(file_manager.data[1], range(5));
    }
    if(file_manager.data[3] == 1){
        file_manager.data[0] = process_list_commands(file_manager.data[0], file);
    }

};

file_manager.graphics = new Window();
file_manager.graphics.t = "File Manager"
file_manager.graphics.y = 50
file_manager.graphics.w = 350
file_manager.graphics.h = 200

render_filelist = function() {
    Graphics.drawRect(file_manager.graphics.x, file_manager.graphics.y+(20*(file_manager.data[0]+1)), file_manager.graphics.w, 20, Color.new(64, 0, 128, 64));
    for (var i = 0; i < file.length; i++) {
        Font.fmPrint(file_manager.graphics.x+10, file_manager.graphics.y+(3+(20.0*(i+1))), 0.55, 
        file[i].name);
        if(!file[i].dir){
            Font.fmPrint(file_manager.graphics.x+200, file_manager.graphics.y+(3+(20.0*(i+1))), 0.55, 
            String(file[i].size));
        }
        
    };
    if(file_manager.data[2] == 1) {
        Graphics.drawRect(file_manager.graphics.x+file_manager.graphics.w, file_manager.graphics.y+20, 75, 20*5, Color.new(0, 0, 0, 100));
        Graphics.drawRect(file_manager.graphics.x+file_manager.graphics.w, file_manager.graphics.y+20*(file_manager.data[1]+1), 75, 20, Color.new(64, 0, 128, 64));
        Font.fmPrint(file_manager.graphics.x+file_manager.graphics.w+5, file_manager.graphics.y+(3+(20.0*(1))), 0.55, "Copy");
        Font.fmPrint(file_manager.graphics.x+file_manager.graphics.w+5, file_manager.graphics.y+(3+(20.0*(2))), 0.55, "Move");
        Font.fmPrint(file_manager.graphics.x+file_manager.graphics.w+5, file_manager.graphics.y+(3+(20.0*(3))), 0.55, "Paste");
        Font.fmPrint(file_manager.graphics.x+file_manager.graphics.w+5, file_manager.graphics.y+(3+(20.0*(4))), 0.55, "Rename");
        Font.fmPrint(file_manager.graphics.x+file_manager.graphics.w+5, file_manager.graphics.y+(3+(20.0*(5))), 0.55, "Delete");
    };
};

file_manager.graphics.add(render_filelist);

/*
render_progress = function() {
    printCentered(fileman.x-20+(fileman.w/2), fileman.y+35.0, 0.5, "Copying " + src + " to " + dst);
    printCentered(fileman.x-20+(fileman.w/2), fileman.y+140.0, 0.5, String(Math.round((prog.current/prog.final)*100))+"%");
    prog = System.getFileProgress();
    Graphics.drawRect(fileman.x+20, fileman.y+(fileman.h-60), (fileman.w-40)*(prog.current/prog.final), 20, Color.new(64, 0, 128, 64));
};

fileman.add(render_progress);
*/