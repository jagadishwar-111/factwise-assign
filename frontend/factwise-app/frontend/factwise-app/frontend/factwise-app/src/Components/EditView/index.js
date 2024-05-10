import React, { useState } from 'react';
import Modal from 'react-modal';
import { CiCircleChevRight, CiCircleRemove } from "react-icons/ci";
import "./index.css";

const EditView = (props) => {
    const { showEditModal, handleEditModal, eachCelebrityDetails } = props;
    const { id, first, last, dob, gender, email, picture, country, description } = eachCelebrityDetails;

    const [genderValue, setGender] = useState(gender);
    const [emailValue, setEmail] = useState(email);
    const [ageValue, setAge] = useState(dob);
    const [countryValue, setCountry] = useState(country);
    const [descriptionValue, setDescription] = useState(description);

    const closeEditModal = () => {
        handleEditModal({});
    };

    const submitEditDetails = () => {
        if (ageValue === "" || emailValue === "" || genderValue === "" || countryValue === "" || descriptionValue === "") {
            alert("Enter all the details");
        } else {
            const obj = {
                id,
                first,
                last,
                picture,
                dob: ageValue,
                gender: genderValue,
                email: emailValue,
                country: countryValue,
                description: descriptionValue
            };
            handleEditModal(obj);
        }
    };

    const handleAgeValue = (e) => {
        setAge(e.target.value);
    };

    const handleGenderValue = (e) => {
        setGender(e.target.value);
    };

    const handleCountryValue = (e) => {
        setCountry(e.target.value);
    };

    const handleEmailValue = (e) => {
        setEmail(e.target.value);
    };

    const handleDescriptionValue = (e) => {
        setDescription(e.target.value);
    };

    return (
        <Modal className="edit-modal" isOpen={showEditModal}>
            <div className="edit-modal-card">
                <div className="details-top">
                    <div className="inner-card">
                        <label className="label-text">
                            Date of Birth:
                        </label>
                        <br />
                        <input onChange={handleAgeValue} className="input-text" type="date" value={ageValue} />
                    </div>
                    <div className="inner-card">
                        <label className="label-text">
                            Gender:
                        </label>
                        <br />
                        <select onChange={handleGenderValue} className="input-text" value={genderValue}>
                            <option  value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="rathernotsay">Rather Not Say</option>
                        </select>
                    </div>

                    <div className="inner-card">
                        <label className="label-text">
                            Country:
                        </label>
                        <br />
                        <input onChange={handleCountryValue} className="input-text" type="text" value={countryValue} />
                    </div>

                    <div className="inner-card">
                        <label className="label-text">
                            Email:
                        </label>
                        <br />
                        <input onChange={handleEmailValue} className="input-text" type="text" value={emailValue} />
                    </div>
                </div>

                <br />
                <div className="inner-card-desc">
                    <label className="label-text">
                        Description:
                    </label>
                    <br />
                    <textarea onChange={handleDescriptionValue} className="desc-text" value={descriptionValue} />
                </div>

                <div className="delete-edit-card">
                    <button onClick={submitEditDetails} className="icon-save-button">
                        <CiCircleChevRight />
                    </button>
                    <button onClick={closeEditModal} className="icon-not-save-button">
                        <CiCircleRemove />
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default EditView;
