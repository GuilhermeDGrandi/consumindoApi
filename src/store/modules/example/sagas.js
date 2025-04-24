import {call, put, all, takeLatest} from 'redux-saga/effects'
import {toast} from 'react-toastify'

import * as actions from './actions'
import * as types from '../types'


const requisição = () => new Promise((resolve, reject) =>{
    setTimeout(()=>{
        resolve()
    },600)
})

function* exampleRequest(){
    try{
        yield call(requisição)
        toast.success('Success')
        yield put(actions.buttonClickedSuccess())

    }catch{
        toast.error('Error')
        yield    put(actions.buttonClickedFailure())
    }
}

export default all([
    takeLatest(types.BUTTON_CLICKED_REQUEST, exampleRequest),
])