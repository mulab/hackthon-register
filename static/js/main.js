jQuery(function($) {
    $('html').terminal({
        help: function() {
            this.echo("info         Show information about the Hackthon");
            this.echo("register     Register LabmU's Hackthon\n");
        },
        info: function() {
            this.echo("Time:");
            this.echo("Place:");
            this.echo("Theme:");
            this.echo("Description:");
            this.echo("\n");
        },
        register: function() {
            var term = this,
                register_info = {};
            term
                .push(function(command){
                    if(command.match(/y|yes/i)){
                        term.echo('sending your register info...');
                        $.ajax({
                            type:'POST',
                            headers:{'x-csrf-token':$('meta[name="csrf"]').attr('content')},
                            data:register_info,
                            success:function(res){
                                term.echo('Successfully registered!\n');
                            },
                            error:function(res){
                                term.echo('There are some errors. Please contact mulab.thu@gmail.com\n');
                            }
                        });
                        term.pop();
                    }else if (command.match(/n|no/i)){
                        term.echo('cancelled.');
                        term.pop();
                    }
                },{
                    prompt:'Is your register info correct?(y/n)'
                })
                .push(function(command){
                    register_info["github"] = command;
                    term.pop();
                },{
                    prompt: 'Your Github Id:'
                })
                .push(function(command) {
                    register_info["Email"] = command;
                    term.pop();
                }, {
                    prompt: 'Your Email:'
                })
                .push(function(command) {
                    register_info["Phone"] = command
                    term.pop();
                }, {
                    prompt: 'Your Phone Number:'
                })
                .push(function(command) {
                    register_info["Name"] = command;
                    term.pop();
                }, {
                    prompt: 'Your Name:'
                });
        }
    }, {
        greetings: function() {
            return "\n" +
                ",--.           ,--.             ,--. ,--.    ,--.  ,--.              ,--.     ,--.  ,--.                     \n" +
                "|  |    ,--,--.|  |-. ,--,--,--.|  | |  |    |  '--'  | ,--,--. ,---.|  |,-.,-'  '-.|  ,---.  ,---. ,--,--,  \n" +
                "|  |   ' ,-.  || .-. '|        ||  | |  |    |  .--.  |' ,-.  || .--'|     /'-.  .-'|  .-.  || .-. ||      \\ \n" +
                "|  '--.\\ '-'  || `-' ||  |  |  |'  '-'  '    |  |  |  |\\ '-'  |\\ `--.|  \\  \\  |  |  |  | |  |' '-' '|  ||  | \n" +
                "`-----' `--`--' `---' `--`--`--' `-----'     `--'  `--' `--`--' `---'`--'`--' `--'  `--' `--' `---' `--''--' \n" +
                "                                                                                                             \n" +
                "type help for help\n";
        }
    });
});