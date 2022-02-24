// @ts-nocheck
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const form = document.querySelector('[data-form]')

const queryParamsContainer = document.querySelector('[data-query-params]')
const requestHeadersContainer = document.querySelector('[data-request-headers]')
const keyValueTemplate = document.querySelector('[data-key-value-template]')
const responseHeaderContainer = document.querySelector('[data-response-header]')

document.querySelector('[data-add-query-param-btn]').addEventListener('click',() => {
    queryParamsContainer.appendChild(createKeyValuePair())
})

document.querySelector('[data-add-request-header-btn]').addEventListener('click',() => {
    requestHeadersContainer.appendChild(createKeyValuePair())
})

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

function createKeyValuePair() {
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector('[data-remove-btn').addEventListener('click', (e)=> {
        e.target.closest('[data-key-value-pair]').remove()
    })
    return element
}

form.addEventListener('submit',e => {
    e.preventDefault();

    axios({
        url: document.querySelector('[data-url]').value,
        method: document.querySelector('[data-method]').value,
        params: keyValueParisToObjects(queryParamsContainer),
        headers:keyValueParisToObjects(requestHeadersContainer),
    }).then(response => {
        document.querySelector('[data-response-section]').classList.remove('d-none')
        //updateResponseDetails(response)
        //updateResonseEditor(response.data)
        console.log(response.headers)
        updateRespnseHeaders(response.headers)
    })

})

function updateRespnseHeaders(headers) {
    //responseHeaderContainer.innerHTML = ""
    Object.entries(headers).forEach( ([key, value]) => { 
        const keyElement = document.createElement('div')
        console.log(key)
        keyElement.textContent = key
        responseHeaderContainer.append(keyElement)
        
        const valueElement = document.createElement('div')
        valueElement.textContent = value
        responseHeaderContainer.append(valueElement)

    })
}

function keyValueParisToObjects(container){
    const pairs = container.querySelectorAll('[data-key-value-pair')
    return [...pairs].reduce( (data, pair) => {
        const key = pair.querySelector('[data-key]').value
        const value = pair.querySelector('[data-value]').value

        if (key === '') return data
        return { ...data, [key]: value}
    },  {} )
}