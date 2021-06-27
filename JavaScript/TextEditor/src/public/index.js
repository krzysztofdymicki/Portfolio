// basics

const returnResult = () => {
    return document.getElementById('result')
}

// Functionality for creating a new file

const createNew = () => {
    let result = returnResult()
    console.log(result.innerHTML.length)
    if(result.innerHTML.length > 20) {
       return  confirm('Do you want to discard changes and create new document?') ?  document.getElementById('result').textContent = "" : null
    }
    else return null
}

// saveButton retrieving and adding functionality to it

const saveButton = document.getElementById('save-button')
saveButton.addEventListener('click', () => {
    const filename = prompt('How to name your document?', 'new-file')
    filename ? downloadFile(filename) : null
})

//Functionality for uploading a file

const uploadFile = () => {
    const file = document.getElementById('file').files[0]
    let formData = new FormData()
    formData.append('file', file)
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(success => returnResult().innerHTML = success.text)
    .catch(error => {
        console.error('Error', error)
    })
    document.getElementById('file').value = null
}

// uploadButton retrieving and adding functionality to it

const uploadButton = document.getElementById('upload-button')
uploadButton.addEventListener('click', (e) => {
    e.preventDefault()
    uploadFile()
})

// Functionality for downloading a file

const downloadFile = (filename) => {

    const checkedValue = document.querySelector('input[name="data-type"]:checked').value
    
    let result = returnResult()
    const newObject = {
        text: result.innerHTML
    }
    const fileToDownload = checkedValue === "JSON" ? new Blob ([JSON.stringify(newObject)], { type: 'application/json'})
                                                   : new Blob ([newObject.text], { type: 'text/plain'})

    const fakeLink = document.createElement('a')
    fakeLink.href = URL.createObjectURL(fileToDownload)
    fakeLink.download = filename
    fakeLink.click()
    URL.revokeObjectURL(fakeLink.href)
}

// newButton retrieving and adding funcionality to it

const newButton = document.getElementById('new-button')
newButton.addEventListener('click', () => {
    createNew()
})


/* Creating functionality that will show which functionality(button) is activated --- NEEDS SOME REPAIRMENT 

let togglableButtons = [
    {
        name: 'bold',
        active: false,
        openTag: '<b>',
        closeTag: '</b>'
    },
    {
        name: 'italic',
        active: false,
        openTag: '<b>',
        closeTag: '</b>'
    },
    {
        name: 'underline',
        active: false,
        openTag: '<b>',
        closeTag: '</b>'
    }
]

const toggleActivity = (buttonName) => {
    let selectedOuterHTML = window.getSelection()
    let button = togglableButtons.find( b => b.name === buttonName )
    if(!button.active){
    document.getElementById(buttonName).className = "text-tool-active"
    return togglableButtons = togglableButtons.map( b => b.name === buttonName ? {...b, active: true} : b)
    }
    else {
    document.getElementById(buttonName).className = "text-tool"
    return togglableButtons = togglableButtons.map( b => b.name === buttonName ? {...b, active: false} : b )
    }
}
*/ 

// Retrieving text-tools buttons and applying functionality

const textButtons = document.querySelectorAll('.text-tool')

textButtons.forEach( button => {
    button.addEventListener('click', () => {
        let command = button.dataset['functionality']
        document.execCommand(command, false, null)
        returnResult().focus()
    })
})








