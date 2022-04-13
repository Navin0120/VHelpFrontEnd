
import React from 'react'
const Card=[
    {
        image:"",
        taskName:"Plumbing",
        taskDetails:"loadshkfdskjfhgdskf"

    },
    {
        image:"",
        taskName:"Plumbing",
        taskDetails:"loadshkfdskjfhgdskf"

    },
    {
        image:"",
        taskName:"Plumbing",
        taskDetails:"loadshkfdskjfhgdskf"

    }
]
const TaskCard = () => {
  return (
      
    <div>
      <div className='col-sm-3 offset-md-2' >
                    <div className="card" >
                        <img src={img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5>Cleaning</h5>
                            <p className="card-text">Task Details</p>
                            <input type="radio" className="btn-check" name="task" id="cleaning" autoComplete="off" onChange={handleTask} />
                            <label className="btn btn-outline-success" htmlFor="cleaning">Select</label>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default TaskCard
