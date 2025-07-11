"use client";

import SubmitButton from "./SubmitButton"
import { updateGuest } from "../_lib/actions";
import { useEffect } from "react";

export interface IGuest {
  _id: string;
  full_name: string;
  email: string;
  nationality?: string;
  country_flag?: string;
  national_id?: string;
}

export default function UpdateProfileForm({children, guest} : {children : React.ReactNode; guest : IGuest}) {
 
const {full_name, email, national_id, country_flag} = guest;
console.log("children", children)
useEffect(() => {
  
}, [])
    return (
        <form action={updateGuest} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            name="full_name"
            defaultValue={full_name}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            name="email"
            defaultValue={email}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            
            <img src={country_flag}  alt="Country flag"
              className="h-5 rounded-sm" />
          </div>

          {children}
        </div>

        <div className="space-y-2"> 
          <label htmlFor="national_id">National ID number</label>
          <input
          defaultValue={national_id}
            name="national_id"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton 
          pendingLabel="Updating...">
            Updating profile
          </SubmitButton>
        </div>
      </form>
    )
}

