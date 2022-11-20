import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import "./CreateRecipe.css";

import * as actions from "../../redux/actions/actions";

// Components
import StepCard from "./StepCard/StepCard";
import DietCard from "./DietCard/DietCard";
import LoadingOthers from "../Loading/LoadingOthers/LoadingOthers";
const CreateRecipe = () => {
  // Hooks

  const {diets, created, loading} = useSelector((state) => state);

  const [form, setForm] = useState({
    name: "",
    summary: "",
    health_score: "",
    steps: [],
    diets: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  const [step, setStep] = useState("");

  const [diet, setDiet] = useState("");

  const [createStep, setCreateStep]= useState(1)

  const [validated, setValidated] = useState({
    name:{valid:false,reason:"Name can't be empty ❌"},
    summary:{valid:false,reason:"Summary can't be empty ❌"},
    health_score:{valid:false,reason:"Health Score can't be empty ❌"},
  });

  //Functions

  const validateFunction = (prop, value) => {
    if(prop === "name" ){
      // NAME VALIDATIONS
      if(value === ""){
        setValidated({
          ...validated,
          name: {valid:false, reason:"Name can't be empty ❌"}
        })
      }else if(/(^\s)|(\s$)/.test(value)){
        setValidated({
          ...validated,
          name:{valid:false, reason:"Empty space at the beggining or at the end ❌"}
        })
      }else if(/\W/.test(value.split(" ").join(""))){
        setValidated({
          ...validated,
          name: {valid:false, reason:"Name can't have any symbols ❌"}
        })
      }else{
        setValidated({
          ...validated,
          name:{valid:true, reason:"Validated ✅"}
        })
      }  
    }else if( prop === "summary"){
      // SUMMARY VALIDATIONS
      if(value===""){
        setValidated({
          ...validated,
          summary: {valid:false, reason:"Summary can't be empty ❌"}
        })
      }else if(/(^\s)|(\s$)/.test(value)){
        setValidated({
          ...validated,
          summary:{valid:false, reason:"Empty space at the beggining or at the end ❌"}
        })
      }else{
        setValidated({
          ...validated,
          summary:{valid:true, reason:"Validated ✅"}
        })
      }
    }
    else if(prop === "health_score"){
      // HEALTH SCORE VALIDATIONS
      if(value===""){
        setValidated({
          ...validated,
          health_score: {valid:false, reason:"Health Score can't be empty ❌"}
        })
      } else if (!/^[0-9][0-9]?$|^100$/.test(value)){
        setValidated({
          ...validated,
          health_score: {valid:false, reason:"Health Score must be a integer between 0-100 ❌"}
        })
      } else{
        setValidated({
          ...validated,
          health_score:{valid:true, reason:"Validated ✅"}
        })
      }
    }
  }

  // --- Step functions --

  const handleRecipeInfChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    validateFunction(e.target.name, e.target.value)
  };

  const handleDietChange = (e) => {
    setDiet(e.target.value);
  };

  const handleStepChange = (e) => {
    setStep(e.target.value);
  };


  const addStep = (e) => {
    e.preventDefault();
    if (step === "") alert("Está vacío");
    else {
      setForm({
        ...form,
        steps: [...form.steps, step],
      });
      setStep("");
    }
  };

  const deleteStep = (step) => {
    let filtered = form.steps.filter((stp) => stp !== step);
    setForm({
      ...form,
      steps: filtered,
    });
  };

  const addDiet = (e) => {
    e.preventDefault();
    if (diet === "") alert("Select a diet please");
    else {
      let idxDiet = form.diets.indexOf(diet);
      if (idxDiet < 0 && diet !== "") {
        setForm({
          ...form,
          diets: [...form.diets, diet],
        });
        setDiet("");
      } else {
        setDiet("");
        alert("La dieta ya fue seleccionada");
      }
    }
  };

  const deleteDiet = (dietName) => {
    let filtered = form.diets.filter((dt) => dt !== dietName);
    setForm({
      ...form,
      diets: filtered,
    });
  };

  // --- Other Functions

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdSteps = form.steps.map((stp, idx) => {
      return {
        number: idx + 1,
        step: stp,
      };
    });

    const body = {
      ...form,
      health_score: Number(form.health_score),
      steps: createdSteps,
    };

    dispatch(actions.createRecipe(body));
    setCreateStep (createStep +1)
  };

  const next = (e)=>{
    e.preventDefault()
    setCreateStep(createStep +1)
  }

  const back = (e)=>{
    e.preventDefault()
    setCreateStep(createStep -1)
  }

  const restart = (e)=>{
    e.preventDefault()
    setCreateStep(1)
  }

  return (
    <div className="general-create-container">
      <form className="container-form">
        <fieldset className={`info-fieldset ${createStep!==1?"noneDisplay":""}`}>
          <h3>Recipe Info</h3>
          <label htmlFor="name">
            Name:
            <input
              name="name"
              type="text"
              onChange={handleRecipeInfChange}
              placeholder="Canadian Cheese Buger..."
              value={form.name}
            />
            <i>* {`${validated.name.reason}`}</i>
          </label>

          <label htmlFor="summary">
            Summary: 
            <textarea
              name="summary"
              type="text"
              onChange={handleRecipeInfChange}
              placeholder="Canadian style burger..."
              value={form.summary}
            />
            <i>* {`${validated.summary.reason}`}</i>
          </label>

          <label htmlFor="health_score">
            Health Score: 
            <input
              name="health_score"
              type="number"
              onChange={handleRecipeInfChange}
              placeholder="0 - 100"
              value={form.health_score}
            />
            <i>* {`${validated.health_score.reason}`}</i>
          </label>
          <hr></hr>
          <div className="createSteps next">
            <button 
              disabled={!(validated.name.valid&&validated.summary.valid&&validated.health_score.valid)} 
              onClick={next} 
            >
              Next
            </button>
          </div>
        </fieldset>


        <fieldset className={`diets-fieldset ${createStep!==2?"noneDisplay":""}`}>
          <h3>Recipe Diets</h3>
          <div>
            <i>Select all recipe diets</i>
          </div>
          <div className="select-container">
            <select onChange={handleDietChange} value={diet}>
              <option value="">--Diets--</option>
              {diets.map((dt) => (
                <option key={`dtOp${dt.name}`} value={dt.name}>{dt.name}</option>
                ))}
            </select>            
            <button className="add-diets-button" onClick={addDiet} disabled={diet==""} >Add Diet</button>
          </div>
          <DietCard diets={form.diets} deleteFunction={deleteDiet} />
          <hr></hr>
          <div className="createSteps" >
            <button  onClick={back} >Back</button>
            <button  onClick={next} >Next</button>
          </div>

        </fieldset>

        <fieldset className={`steps-fieldset ${createStep!==3?"noneDisplay":""}`}>
          <h3>Recipe Steps</h3>
          <p>Please, add the steps one by one</p>
          <textarea
            name="step"
            onChange={handleStepChange}
            value={step}
            placeholder="Write the step here..."
          />
          <StepCard steps={form.steps} deleteFunction={deleteStep} />
          <div className="createSteps add-delete">
            <button onClick={deleteStep}>Delete Step</button>
            <button onClick={addStep}>Add Step</button>
          </div>
          <hr></hr>
          <div className="createSteps">
            <button onClick={back} >Back</button>
            <button  onClick={next} >Next</button>
          </div>
        </fieldset>

        <fieldset className={`create-fieldset ${createStep!==4?"noneDisplay":""}`}>
          <h3>Create-Summary</h3>
          <div className="summary">
            <label htmlFor="p-summary-name">Name: </label>
            <p name="p-summary-name">{form.name}</p>

            <label htmlFor="p-summary-hs">HealthScore: </label>
            <p name="p-summary-hs">{form.health_score}</p>

            <label htmlFor="p-summary-diets">Diets: </label>
            <p name="p-summary-diets">{form.diets.map((dt,idx,ar)=><p key={`pDt${idx}`}>{` ${dt}${idx==ar.length-1?".":","}`}</p>)} </p>

            <label htmlFor="p-summary-steps">Steps: </label>
            <p>{form.steps.length}</p>

          </div>
          <div className="createSteps finalCreate">
            <button onClick={handleSubmit}>Create</button>
          </div>
          <hr></hr>
          <div className="createSteps">
            <button onClick={back}>Back</button>
          </div>

        </fieldset>
        
        <fieldset className={`created-fieldset ${createStep!==5?"noneDisplay":""}`}>
          {
            loading
            ?<div className="created-loader" ><LoadingOthers /></div>
            :
          <div className="last-info">
            <h3>{created?"Recipe created successfully":"Ops! Could not create the recipe"}</h3>
            <hr></hr>
            <div className="createSteps">
              <button className={`${created?"noneDisplay":""}`} onClick={restart}>Restart</button>
              <Link className={`button-link ${created?"":"noneDisplay"}`} to="/app/home">
                <button>Go Home</button>
              </Link>
            </div>
          </div>
          }
        </fieldset>

      </form>
    </div>
  );
};

export default CreateRecipe;
