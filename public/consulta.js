document.querySelector('form').addEventListener('submit', function(event) {
    
    const editorContent = document.getElementById('editor').innerHTML;
    
    document.getElementById('editorContent').value = editorContent;

    console.log("Entra");
});

