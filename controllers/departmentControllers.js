import departModel from '../Model/departModel.js'
import { validateDepart } from '../helpers/departHelpers.js'

export const validateDepartment = async(req,res,next)=>{
    console.log("validating department")
    const { errors, isValid } = validateDepart(req.body)
    console.log(isValid)
    if (!isValid) {
        return res.status(400).json(errors)
      }
      try {
        const { email, name ,profileImage,yearFounded,description} = req.body
        console.log(email, name,profileImage,yearFounded,description)
        const existing = await departModel.findOne({ email })
        if (existing) {
          return res.status(409).json({ message: "Department mail id already exists" })
        }
        return next();
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again later" })
      }

}

export const addDepart = async(req,res) =>{
    console.log("adding departmnet")
    try {
        const { email, name ,profileImage,yearFounded,description} = req.body
        console.log(email, name,profileImage,yearFounded,description)
        const newDepartment = new departModel({
            name,
            email,
            profileImage,
            yearFounded,
            description,
        })
        await newDepartment.save();
        return res.status(201).json({ message: 'Department added successfully' },newDepartment);
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again later" })
      }
}


export const editDepart = async (req,res) => {
    console.log("editing department details")
    try {
        const { name, profileImage, yearFounded, description } = req.body;

        const { _id } = req.params;
        console.log(_id)

        const updatedDepartment = await departModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    name,
                    profileImage,
                    yearFounded,
                    description,
                },
            },
            { new: true } 
        );

        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }
        return res.status(200).json({ message: 'Department details updated successfully', department: updatedDepartment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later' });
    }
}

export const deleteDepart = async(req,res)=>{
    try {
        const { _id } = req.params;

        const updatedDepartment = await departModel.findByIdAndUpdate(
            _id,
            { $set: { isDeleted: true } },
            { new: true } 
        );

        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }

        return res.status(200).json({ message: 'Department soft deleted successfully', department: updatedDepartment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later' });
    }
}