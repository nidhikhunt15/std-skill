import React, { useState, useRef, useEffect } from 'react'

const Skill = () => {

    const skills = ["C", "C++", "Html", "Css", "Asp.net", "Php", "React.js", "Node.js", "Python", "Ruby", "Java", "JavaScript", "Sql", "Kotlin"]

    const [stdDetail, setStdDetail] = useState({ name: "", birthdate: "", gender: "", skill: [] });
    const [allStdDetail, setAllStdDetail] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [searchField,setSearchField] = useState("")

    const ref = useRef(null)
    const refClose = useRef(null)


    const handleChange = (e) => {
        setStdDetail({ ...stdDetail, [e.target.name]: e.target.value })

    }

    const handleCheck = (e) => {
        let check = e.target.checked
        let value = e.target.value
        if (check) {
            let skill = ([...stdDetail.skill, value])
            setStdDetail({ ...stdDetail, skill: skill })
        }
        else {

            let remove = (stdDetail.hobby.filter((e) => (e !== value)))
            setStdDetail({ ...stdDetail, skill: remove })
        }
    }

    const addData = () => {
        ref.current.click();
        setStdDetail({ name: "", birthdate: "", gender: "", skill: [] })
        setIsEdit(false);
    }

    const updateData = (currentValue, index) => {
        ref.current.click()
        setStdDetail({ index, name: currentValue.name, gender: currentValue.gender, birthdate: currentValue.birthdate, skill: currentValue.skill })
        setIsEdit(true)
    }

    const deleteData = (index) => {
        allStdDetail.splice(index, 1)
        localStorage.setItem('students', JSON.stringify(allStdDetail));
        setAllStdDetail(JSON.parse(localStorage.getItem('students')))
    }

    const saveData = () => {
        if (isEdit) {
            let update = (JSON.parse(localStorage.getItem('students')))

            for (let index = 0; index < update.length; index++) {
                if (index === stdDetail.index) {
                    update[index].name = stdDetail.name;
                    update[index].gender = stdDetail.gender;
                    update[index].birthdate = stdDetail.birthdate;
                    update[index].skill = stdDetail.skill;
                }
                localStorage.setItem('students', JSON.stringify(update));
                setAllStdDetail(update)
            }
        } else {
            let details = [...allStdDetail, stdDetail];
            localStorage.setItem('students', JSON.stringify(details));
            setAllStdDetail(details)
            console.log(details);
            setStdDetail({ name: "", gender: "", birthdate: "", skill: [] })
        }
        refClose.current.click();
    }

    
        const filtered = allStdDetail.filter ((std)=>{
        if(searchField === ""){
               return std;
        } else{ 
           return std.name.toLowerCase().includes(searchField.toLowerCase()) || 
                std.gender.toLowerCase().includes(searchField.toLowerCase()) || 
                std.birthdate.includes(searchField) || 
                std.skill.find(x => x.toLowerCase().includes(searchField))
        }
    })
       console.log(filtered);
    
        const handler = (e)=>{
            var lowercase = e.target.value.toLowerCase();
            setSearchField(lowercase)
        }


    const getData = () => {
        let lsData = (JSON.parse(localStorage.getItem("students")))
        if (lsData != null) {
            setAllStdDetail(lsData)
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            <div className="container">

                <h1 className='text-center my-3'>Student Details</h1>
                 <button type='button' className='btn btn-warning' onClick={addData}><i className="fa-solid fa-plus"></i></button>
                <form className="d-flex my-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handler} />
                    <button className="btn btn-outline-success" type="submit" >Search</button>
                </form>
                <div>
                    
                </div>

                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{isEdit ? "Update data" : "Add data"}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label"> <b>Student Name:</b> </label>
                                        <input type="text" className="form-control" id="name" name='name' value={stdDetail.name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label"><b>Birthdate</b> </label>
                                        <input type="date" className="form-control" id="date" name='birthdate' value={stdDetail.birthdate} onChange={handleChange} />
                                    </div>
                                    <div className='mb-3'>
                                        <label ><b>Gender:</b> </label><br />
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio1">female</label>
                                            <input className="form-check-input" type="radio" id="inlineRadio1" name='gender' value='Female' onChange={handleChange} />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio2">male</label>
                                            <input className="form-check-input" type="radio" id="inlineRadio2" name='gender' value='Male' onChange={handleChange} />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio2">other</label>
                                            <input className="form-check-input" type="radio" id="inlineRadio2" name='gender' value="Other" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <label htmlFor="skill" className="form-label"><b>Skills:</b> </label>   <br />

                                    {skills.map((skill, index) => {
                                        return <div className="mb-3 form-check-inline" key={index}>
                                            <input type="checkbox" className="form-check-input" id={`flexCheckDefault ${index}`} name='skill' value={skill} onChange={handleCheck} />
                                            <label htmlFor={`flexCheckDefault ${index}`} className="form-check-label">{skill}</label>
                                        </div>
                                    })}
                                    <br />

                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}  >Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveData} disabled={stdDetail.name === "" || stdDetail.gender === "" || stdDetail.birthdate === "" || stdDetail.skill === ""}>{isEdit ? "Update data" : "Add data"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <h1>Details</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className='table-dark' scope="col">NO</th>
                            <th className='table-dark' scope="col">Name</th>
                            <th className='table-dark' scope="col">Birthdate</th>
                            <th className='table-dark' scope="col">Gender</th>
                            <th className='table-dark' scope="col">Skill</th>
                            <th className='table-dark' scope="col">Update</th>
                            <th className='table-dark' scope="col">Delete</th>
                        </tr>
                    </thead>
                    {filtered.map((det, index) => {
                        return <tbody key={index}>
                            <tr>
                                <td className='table-secondary'>{index}</td>
                                <td className='table-secondary'>{det.name}</td>
                                <td className='table-secondary'>{det.birthdate}</td>
                                <td className='table-secondary'>{det.gender}</td>
                                <td className='table-secondary'>{det.skill.join(", ")}</td>
                                <td className='table-secondary'><i className="fa-solid fa-file-pen text-success fs-5" onClick={() => updateData(det, index)}></i></td>
                                <td className='table-secondary'><i className='fa-solid fa-trash text-danger fs-5' onClick={() => deleteData(index)}></i></td>
                            </tr>
                        </tbody>
                    })}
                </table>
            </div>
        </div>
    )
}

export default Skill
