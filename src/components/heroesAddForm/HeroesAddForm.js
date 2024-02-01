import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { filtersFetched } from '../../actions';
import {heroCreated} from '../heroesList/heroesSlice';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    //get filter
    const { filters } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();



    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
        // eslint-disable-next-line

    }, []);

    //get filter finish

    const  createOptionName = (data) => {
        switch (data.name) {
            case 'all':
                return {
                    value: '',
                    name: 'Я владею элементом...'
                }
            case 'fire':
                return {
                    value: 'fire',
                    name: 'Огонь'
                }
            case 'water':
                return {
                    value: 'water',
                    name: 'Вода'
                }
            case 'wind':
                return {
                    value: 'wind',
                    name: 'Ветер'
                }
            case 'earth':
                return {
                    value: 'earth',
                    name: 'земля'
                }
            default: return null
        }
    }




    const options = filters.map(item => {
        return (
        <option value={createOptionName(item).value}>{createOptionName(item).name}</option>
        )
    })



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()




    const onAddItem = (data) => {
       
        
        request(`http://localhost:3001/heroes`, "POST",JSON.stringify(data))
         
            .then(dispatch(heroCreated(data)))
            .catch((err) => console.log(err))

         reset() 
    }

    const onSubmit = (data) => onAddItem(data);
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input

                    type="text"
                    {...register("name", { required: true, maxLength: 20 })}
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required

                    {...register("description")}
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    {...register("element")}>
                        {options}

                    {/* <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;