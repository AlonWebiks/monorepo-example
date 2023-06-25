import {funcB} from 'lib-b'
import {funcC} from 'lib-c'

function start() {
    funcB();
    funcC();
    console.log('servic-b started');
}

start()