import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setBookData } from '../Features/BookSlice';
import { HomeBooks } from './Data';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // Prime number program
        let arr = [1, 2];
        for (let i = 4; i <= 100; i++) {
            let flag = true;
            for (let it = 2; it < i; it++) {
                if (i % it == 0) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                arr.push(i);

            }
        }
        // console.log(arr);

        // Initilized book data
        dispatch(setBookData(HomeBooks))
    }, [])

    return (
        <div>
            <NavLink to='/allbook' >Show All book</NavLink>
        </div>
    )
}

export default Home