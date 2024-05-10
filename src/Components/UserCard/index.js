import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import EditView from "../EditView";
import "./index.css";

const UserCard = (props) => {
  const { eachCelebrityDetails, onDeleteItem, onEditItem } = props;
  const { id, first, last, dob, gender, email, picture, country, description } = eachCelebrityDetails;
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmitDelete = () => {
    onDeleteItem(id);
    setShowDeleteModal(false);
    setIsOpen(false)
  };

  const birthYear = new Date(dob).getFullYear();
  const presentYear = new Date().getFullYear();
  const age = presentYear - birthYear;

  const onDeleteTheItem = () => {
    setShowDeleteModal(true);
  };

  const onEditTheItem = () => {
    setShowEditModal(true);
  };

  const handleEditModal = (obj) => {
    if (Object.entries(obj).length === 0) {
      setShowEditModal(false);
      setIsOpen(false)
    } else {
      onEditItem(obj);
      setShowEditModal(false);
      setIsOpen(false)
    }
  };

  return (
    <li className="list-item">
      <div className="closed-state-card">
        <div className="picture-name-card">
          <img src={picture} alt={first} className="picture" />
          <h3 className="name">{first} {last}</h3>
        </div>
        <button className="arrow-button" onClick={handleIsOpen}>
          {isOpen ? (<IoIosArrowUp className="arrow-style" />) : (<IoIosArrowDown className="arrow-style" />)}
        </button>
      </div>

      {isOpen && (
        <div className="open-state-card">
          <div className="details-top">
            <div className="inner-card">
              <label className="label-text">
                Age:
              </label>
              <br />
              <input className="input-text" type="text" value={`${age} years`} readOnly />
            </div>
            <div className="inner-card">
              <label className="label-text">
                Gender:
              </label>
              <br />
              <select className="select-input"  value={gender} readOnly>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="rathernotsay">Rather Not Say</option>
              </select>
            </div>

            <div className="inner-card">
              <label className="label-text">
                Country:
              </label>
              <br />
              <input className="input-text" type="text" value={country} readOnly />
            </div>

            <div className="inner-card">
              <label className="label-text">
                Email:
              </label>
              <br />
              <input className="input-text" type="text" value={email} readOnly />
            </div>
          </div>

          <br />
          <div className="inner-card-desc">
            <label className="label-text">
              Description:
            </label>
            <br />
            <textarea className="desc-text" value={description} readOnly />
          </div>
          <div className="delete-edit-card">
            <button onClick={onEditTheItem} className="icon-edit-delete-button">
              <CiEdit className="icon-edit" />
            </button>
            <button onClick={onDeleteTheItem} className="icon-edit-delete-button">
              <RiDeleteBin5Line className="icon-delete" />
            </button>
          </div>
        </div>
      )}

      <Modal className="modal-delete" isOpen={showDeleteModal}>
        <div className="modal-card">
          <h2 className="popup-heading">Are you sure you want to delete?</h2>
          <div>
            <button className="popup-cancel-button" onClick={() => {
              setIsOpen(false)
              setShowDeleteModal(false)
            }}>Cancel</button>
            <button className="popup-delete-button" onClick={handleSubmitDelete}>Delete</button>
          </div>
        </div>
      </Modal>
      
      {showEditModal && (<EditView eachCelebrityDetails={eachCelebrityDetails} handleEditModal={handleEditModal} showEditModal={showEditModal} />)}
    </li>
  );
}

export default UserCard;
