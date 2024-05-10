import React, { useState } from 'react';
import Modal from 'react-modal';
import './index.css';

const AddData = (props) => {
    const { showAddData,handleAddData } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState(null);
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');

    const handleFirstChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastChange = (e) => {
        setLastName(e.target.value);
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file)
        
        setPicture(imageUrl);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const formData = {
            firstName,
            lastName,
            dob,
            gender,
            email,
            picture,
            country,
            description,
        };
        
        handleAddData(formData)
    };

    const handleCancel = () => {
        handleAddData({})
    }

    return (


        <Modal className="add-modal" isOpen={showAddData}>
                 <div className="user-info-form-container">
            <h2>User Information Form</h2>
            <form className="user-info-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstChange}
                        className="add-input-data"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleLastChange}
                        className="add-input-data"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={dob}
                        onChange={handleDobChange}
                        className="add-input-data"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={handleGenderChange}
                        className="add-input-data"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="add-input-data"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="picture">Picture:</label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        accept="image/*"
                        onChange={handlePictureChange}
                        className="add-input-data"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        onChange={handleCountryChange}
                        className="add-input-data"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="add-input-data"
                        required
                    />
                </div>
                <button className="submit-button" type="submit">Submit</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
        </Modal>
       
    );
};

export default AddData;
