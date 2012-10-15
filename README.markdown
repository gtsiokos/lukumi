# Lukumi: A jQuery-ish module system for the masses

Lukumi decouples your js code into modules of functionality.

## Example
    X$('MessagesMixin', {
        show_success: function(){
            //displays error
        },
        show_error: function(){
            //displays error
        }
    });

    X$('FormValidationMixin', {
        //validation methods here
    });

    X$('SignupForm').mixin(['MessagesMixin','FormValidationMixin']).extends('SignupForm',
        $form: $('#signup-form'),
        init: function(){
            this.handle_events();
        },
        handle_events: function(){
            this.$form.on("submit", function(ev) {
                try{
                    //validate stuff...
                    //submit form...
                    self.show_success();
                }catch(err){
                    self.show_error();
                }
            });
        }
    });

