jQuery(function($) {
    $('html').terminal({
        help: function() {
            this.echo("info         Show information about the Hackthon");
            this.echo("register     Register LabmU's Hackthon");
            this.echo("labmu        Link to Lab mU homepage\n");
        },
        info: function() {
            this.echo("Time: Sat 2014-03-01 10AM~10PM +0800");
            this.echo("Place: TBA");
            this.echo("Theme: Mobile development on TUNet application (http://tunet.lab.mu).");
            this.echo("Best if U: Had exp in Android, iOS development or mobile UX design.\n");
        },
        register: function() {
            var term = this,
                register_info = {};
            term
                .push(function(command){
                    if(command.match(/Y|y|yes|Yes/i)){
                        term.echo('Sending your register info...');
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
                        term.echo('We will contact you later :D\n');
                        term.pop();
                    }else if (command.match(/N|n|no|No/i)){
                        term.echo('cancelled.');
                        term.echo("");
                        term.pop();
                    }
                },{
                    prompt:'Is your register info correct?(y/n)'
                })
                .push(function(command){
                    register_info["Github"] = command;
                    term.pop();
                },{
                    prompt: 'Your Github Id: '
                })
                .push(function(command) {
                    register_info["Email"] = command;
                    term.pop();
                }, {
                    prompt: 'Your Email: '
                })
                .push(function(command) {
                    register_info["Phone"] = command
                    term.pop();
                }, {
                    prompt: 'Your Phone Number: '
                })
                .push(function(command) {
                    register_info["Name"] = command;
                    term.pop();
                }, {
                    prompt: 'Your Name: '
                });
        },
        labmu: function() {
            this.echo("Time: Sat 2014-03-01 10:00:00 +0800\n");
        }
    }, {
        greetings: function() {
            return "\n" +
                ",--.           ,--.             ,--. ,--.    ,--.  ,--.              ,--.     ,--.  ,--.                     \n" +
                "|  |    ,--,--.|  |-. ,--,--,--.|  | |  |    |  '--'  | ,--,--. ,---.|  |,-.,-'  '-.|  ,---.  ,---. ,--,--,  \n" +
                "|  |   ' ,-.  || .-. '|        ||  | |  |    |  .--.  |' ,-.  || .--'|     /'-.  .-'|  .-.  || .-. ||      \\ \n" +
                "|  '--.\\ '-'  || `-' ||  |  |  |'  '-'  '    |  |  |  |\\ '-'  |\\ `--.|  \\  \\  |  |  |  | |  |' '-' '|  ||  | \n" +
                "`-----' `--`--' `---' `--`--`--' `-----'     `--'  `--' `--`--' `---'`--'`--' `--'  `--' `--' `---' `--''--' \n" +
                "
                "What can we do to [[u]help] you?
                ";
        }
    });
});