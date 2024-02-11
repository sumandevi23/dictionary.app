const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('click', async (event) => {
    event.preventDefault();
    await getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try{
        resultDiv.innerHTML = "Fetching Data...."
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        const definitions = data[0].meanings[0].definitions[0];

        resultDiv.innerHTML = `<h2><strong>word:</strong>${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>meaning:</strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
        <p><strong>Example:</strong>${definitions.definition === undefined ? "Not Found" : definitions.example}</p>
        <p><strong>Synonyms:</strong></p>`


        //Fetching Antonyms
        if(definitions.synonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found</span>`
        }
        else{
            for (let i=0; i<definitions.synonyms.length; i++){
                resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>
                `
            } 
        }
        

        //Adding Read more button  
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
    }
    catch (error){
        resultDiv.innerHTML += `<p>Sorry, the word could not be fond</p>`
    }  
};







