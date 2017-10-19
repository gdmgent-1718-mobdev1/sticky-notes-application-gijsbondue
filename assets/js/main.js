function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.testApplicationDbContext(); // Test DbContext
            var parentThis = this;

            //maak voor de button een eventListener
            document.getElementById("make").addEventListener('click', 
                function (){
                        parentThis.makeSN();
                    })
                        
        },
        //maak inde array een sticky note met tekst en display
        "makeSN": function(){
            let sn = new StickyNote();
            sn.message = document.getElementById("textfield").value;;
            sn = this._applicationDbContext.addStickyNote(sn);
            this.displayAllSN();
        },

        "softDelete": function(id){
            console.log (this)

            document.getElementById(id).addEventListener('click', function (){
                console.log (this);
                this.softDeleteStickyNoteById();
            })/* .addEventListener('click',
             function(){
                console.log ("soft delete gelukt")
                
            })
            //ApplicationDbContext.displayAllSN(); */
            
            
        },
        
        //display
        "displayAllSN": function() {
            let data = ApplicationDbContext.getStickyNotes();
            var parentThis = this;
            data.forEach(function(sn) {
                //create date with the dateNumber
                const date =new Date();
                date.setTime = sn.createdDate;
                let tempstr = "";                
                tempstr += `
                <div class='stickyNote' id="ID:${sn.id}">
                    <div ='message'>${sn.message}</div>
                    <img src='img/delete.png' alt='delete' class ='delete' id='${sn.id}' ></img>
                    <small><div ='created' >${date}</div></small>
                        
                </div>`
                document.getElementById('resultaat').innerHTML += tempstr;
                parentThis.softDelete(sn.id);
                
           
            },);
        },


        "testApplicationDbContext": function() {
            // 1. Get all sticky notes
            let data = this._applicationDbContext.getStickyNotes();
            console.log(data);
            // 2. Create a new sticky note
            let sn = new StickyNote();
            sn.message = 'Pak cola  voor mezelf.';
            sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it
            // 3. Get allesticky notes
/*             //data = this._applicationDbContext.getStickyNotes();
            console.log(data);
            // 4. Get sticky note by id
            sn = this._applicationDbContext.getStickyNoteById(2306155430445);
            console.log(sn);
            // 5. Delete sticky note by id
            const deleted = this._applicationDbContext.deleteStickyNoteById(2306155430445);
            console.log(deleted); */
            // 6. Soft Delete sticky note with id: 1551637732407
            //const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(1551637732407);
            //console.log(softDeleted);
            //sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            //console.log(sn);
            // 6. Soft Delete sticky note with id: 1551637732407
/*             const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(1551637732407);
            console.log(softUnDeleted);
            sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            console.log(sn);
            // Update sticky note with id: 1902577181167
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log(sn);
            //sn.message = 'ik heb zin in een zwarte kat (koffie)...';
            const updated = this._applicationDbContext.updateStickyNote(1902577181167);
            console.log(updated);
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log(sn); */
        }
    };

    App.init(); // Initialize the application
});