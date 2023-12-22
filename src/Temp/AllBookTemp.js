
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BookCart } from './BookCart';

const AllBookTemp = () => {
  const [data, setData] = useState(useSelector(state => state.totalBook.data));
  console.log(data);;
  return (
    <div>
      {data.length > 0 && data.map((item => {
        return <div>
          <BookCart key={item._id} data={item} /> 
        </div>
      }))}
    </div>
  )
}

export default AllBookTemp