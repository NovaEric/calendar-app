import Swal from "sweetalert2";
import { arrangeEvents } from "../helpers/arrangeEvents";
import { TokenFetch } from "../helpers/fetch";
import { types } from "../types/types"


export const eventStartAddNew = (event) => {
    return async(dispatch, getState ) => {
        
        const {uid, name} = getState().auth;

        try {
            
            const res = await TokenFetch('events', event, 'POST');
            const body = await res.json();

            if (body.ok) {
                
                event.id = body.event.id;
                event.user = { _id: uid, name}
                dispatch(eventAddNew(event));
            }


        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) => ({

    type: types.eventAddNew,
    payload: event

});

export const startEventsLoad = () => {

    return async(dispatch) => {
        
        try {

            const res = await TokenFetch('events');
            const body = await res.json();
            
            const events = arrangeEvents( body.All_Events );
            
            dispatch(eventLoaded(events));
            
            
        } catch (error) {
            console.log(error);
        }
    }
};

const eventLoaded = (events) => ({

    type: types.eventLoaded,
    payload: events
})

export const eventSetActive = (event) => ({

    type: types.eventSetActive,
    payload: event

});

export const eventClearModalActive = () => ({type: types.eventClearModalActive});


export const startEventUpdate = (event) => {

    return async(dispatch) => {
        
        try {

            const res = await TokenFetch(`events/${ event.id}`, event, 'PUT');
            const body = await res.json();
            
            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }
};

const eventUpdated = (event) => ({
    
    type: types.eventUpdated,
    payload: event
});


export const startEventDelete = () => {

    return async(dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;
        
        try {

            const res = await TokenFetch(`events/${ id }`, {},  'DELETE');
            const body = await res.json();
            
            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () => ({type: types.eventDeleted});

export const eventLogout = () => ({ type: types.eventLogout });


