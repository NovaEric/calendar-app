import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CalendarEvent } from './CalendarEvent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearModalActive, eventSetActive, startEventsLoad } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEvent } from '../ui/DeleteEvent';

const localizer =  momentLocalizer(moment);


export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    
    dispatch(startEventsLoad());
    
  }, [dispatch])
  

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectedEvent = (e) => {
      
      dispatch(eventSetActive(e));
   
  }

  const onSelectedSlot = () => {
      
      dispatch(eventClearModalActive());
    
  }

  const onViewChanged = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#0066ff' : '##80bfff' ,
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
  
    return { style }
  };
  
  return (
    <div className='calendar-screen'>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectedEvent }
        onSelectSlot={ onSelectedSlot }
        selectable={ true }
        onView={ onViewChanged }
        view={ lastView }
        components={{ event: CalendarEvent}}
      />

      <AddNewFab />

      {
        (activeEvent) 
        && 
        <DeleteEvent />
      }

      <CalendarModal />
    </div>
  )
}
