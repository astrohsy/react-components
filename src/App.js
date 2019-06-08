
import React, {Component } from 'react';
import WordCloud from './WordCloud';

  
const sample = require('./data.json');
const fontSizeMapper = word => Math.log2(word.value) * 5;

function randomExponential(rate, randomUniform) {
    // http://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
    rate = rate || 1;
  
    // Allow to pass a random uniform value or function
    // Default to Math.random()
    var U = randomUniform;
    if (typeof randomUniform === 'function') U = randomUniform();
    if (!U) U = Math.random();

    if (-Math.log(U)/rate > 15) {
        return Math.pow(-Math.log(U)/rate,3);
    }
  
    return -Math.log(U)/rate;
  }

const data = sample.map((x) => { return { text: x, value: Math.floor(randomExponential(0.15))}})

class App extends Component {

    render() {
        console.log(data);
        return (
            <div>
                <WordCloud data={data} fontSizeMapper={fontSizeMapper} />
            </div>
        )
    }
}

export default App;