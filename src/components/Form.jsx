import React from 'react'
import { useForm } from "react-hook-form";
import 'leaflet/dist/leaflet.css'
import {
  MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker, Polygon
} from 'react-leaflet'
import axios from 'axios';

const colorOptions = {color:'aquamarine'}
const centerPolygon=[
  [
    [55.790823, 37.539031],
    [55.688479, 37.521845],
    [55.690906, 37.775819],
    [55.813141, 37.760065]
  ]
]
const center=[55.781696, 37.663072]

const Form = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    axios.post('https://637f91ca2f8f56e28e904e7d.mockapi.io/form', data)
    alert('Заявка отправлена')
    console.log(data)
  }

  console.log(watch("example")); 

  return (
    <div>
      <form id='form' onSubmit={handleSubmit(onSubmit)}>
        <h1>Заполните заявку на обратную связь</h1>
          <div className='input-group mb-3'>
            <input 
              {...register('lastName',{
                required: true,
                maxLength: 50,
                pattern:/^[А-Яа-я]+$/i
              })}
              type='text'
              className='form-control'
              placeholder='Фамилия'/>
          </div>
          {errors?.lastName?.type == 'required'&&(
            <p>Поле обязательно для заполнения</p>
          )}
          {errors?.lastName?.type == 'maxLength'&&(
            <p>Поле не может содержать более 50 символов</p>
          )}
          {errors?.lastName?.type == 'pattern'&&(
            <p>Поле заполненно некорректно</p>
          )}

          <div className='input-group mb-3'>
            <input 
              {...register('firstName',{
                required: true,
                maxLength: 25,
                pattern:/^[А-Яа-я]+$/i
              })}
              type='text'
              className='form-control'
              placeholder='Имя'/>
          </div>
          {errors?.firstName?.type == 'required'&&(
            <p>Поле обязательно для заполнения</p>
          )}
          {errors?.firstName?.type == 'maxLength'&&(
            <p>Поле не может содержать более 25 символов</p>
          )}
          {errors?.firstName?.type == 'pattern'&&(
            <p>Поле заполненно некорректно</p>
          )}

          <div className='input-group mb-3'>
            <input 
              {...register('patronymic',{
                maxLength: 30,
                pattern:/^[А-Яа-я]+$/i
              })}
              type='text'
              className='form-control'
              placeholder='Отчество'/>
          </div>
          {errors?.patronymic?.type == 'maxLength'&&(
            <p>Поле не может содержать более 30 символов</p>
          )}
          {errors?.patronymic?.type == 'pattern'&&(
            <p>Поле заполненно некорректно</p>
          )}

          <div className='input-group mb-3'>
            <input 
              {...register('email',{
                required: true,
                maxLength: 100,
              })}
              type='text'
              className='form-control'
              placeholder='Email'/>
          </div>
          {errors?.email?.type == 'required'&&(
            <p>Поле обязательно для заполнения</p>
          )}
          {errors?.email?.type == 'maxLength'&&(
            <p>Поле не может содержать более 100 символов</p>
          )}
        <input className='btn btn-outline-primary' type="submit" />
      </form>
<br></br>
      <MapContainer
        center={center}
        zoom={10}
        style={{
          width:'100vw',
          height:'500px'
        }}
      >
        <TileLayer
          url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Ynm2QKsGz19DEGhwvG8Y'
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />

        <CircleMarker
          center={center}
          pathOptions={{color:'black'}}
          radius={10}
        />

        <Marker position={center}>
          <Popup>
            Мы находимся тут
          </Popup>
          <Tooltip>
            Мы находимся тут
          </Tooltip>
        </Marker>

        <Polygon positions={centerPolygon} pathOptions={colorOptions} />

      </MapContainer>
    </div>
  );
}

export default Form