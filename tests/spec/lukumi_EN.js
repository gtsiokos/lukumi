describe("Lukumi", function() {
    
    describe('A Lukumi module', function() {
        
        beforeEach(function() {
        
            X$('Module1',{
                key_1: 12345,
                init: function(){
                    return this;
                }
            });
        
        });
        
        it('Should contain module\'s name in the _meta properties', function() {
            expect(X$('Module1')._meta['name']).toBe('Module1');
            //expect(X$('Module1')._meta['extends']).toBeDefined();
        });
        
        it('Should not contain _meta properties for extended modules when the module is not extended', function() {
            expect(X$('Module1')._meta['extends']).toBeUndefined();
        });
    });
    
    describe('When a module is deleted', function() {
        
        beforeEach(function() {
        
            X$('Module1',{
                key_1: 12345,
                init: function(){
                    return this;
                }
            });
            
            X$('Module1').delete();
        
        });
        
        it('Should be removed by the specified Lukumi modules', function() {
            expect(X$.get('Module1')).toBeUndefined();
        });
    });
    
    describe('When a Lukumi module extends another Lukumi module', function() {
        
        beforeEach(function() {
        
            X$('Module1',{
                key_1: 12345,
                init: function(){
                    return this;
                }
            });
            
            X$('Module2').extends('Module1', {
                key_2: 23456,
                init: function(){
                    return this;
                }
            });
            
        });
        
        it('Should contain _meta properties for the extended module', function() {
            expect(X$('Module2')._meta['extends'][0]).toBe('Module1');
        });
        
        it('Should inherit properties of the extended module', function() {
            expect(X$('Module2').key_1).toBeDefined();
            expect(X$('Module2').key_1).toBe(12345);
        });
        
        it('Should preserve its own properties', function() {
            expect(X$('Module2').key_2).toBeDefined();
            expect(X$('Module2').key_2).toBe(23456);
        });
        
        it('The extended module should not contain _meta properties for the module it extends', function() {
            expect(X$('Module1')._meta['extends']).toBeUndefined();
        });
    });
    
    describe('When a Lukumi module mixes-in another Lukumi module', function() {
        
        beforeEach(function() {
        
            X$('Module1',{
                key_1: 12345,
                init: function(){
                    return this;
                }
            });
            
            X$('Mixin1',{
                mixin_func1: function(){ return true; },
                init: function(){
                    var self = this;
                    self.mixin_func1();
                    return this;
                }
            });
            
            X$('Mixin2',{
                mixin_func2: function(){ return true; },
            });
            
            X$('Module1').mixin(['Mixin1', 'Mixin2']);
        });
        
        it('Should contain its _meta properties ', function() {
            expect(X$('Module1')._meta['name']).toBe('Module1');
            //expect(X$('Module1')._meta['extends']).toBeDefined();
        });
        
        it('Should contain properties of the mixed-in module', function() {
            expect(X$('Module1').mixin_func1).toBeDefined();
            expect(X$('Module1').mixin_func2).toBeDefined();
        });
        
        it('The mixin module should contain its _meta properties', function() {
            expect(X$('Mixin1')._meta['name']).toBe('Mixin1');
        });
    });
    
});
