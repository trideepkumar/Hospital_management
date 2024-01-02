import employeeModel from "../Model/employeeModel.js";
import { validateEmployee } from "../helpers/employeeHelpers.js";

export const validateEmployees = async (req, res, next) => {
    console.log("validating employee")
    console.log(req.body)
    const { errors, isValid } = validateEmployee(req.body)
    console.log(isValid)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    try {
        const { email, employeeNumber, name, age, profileImage, description, role, department } = req.body
        console.log(email, employeeNumber, age, name, profileImage, description, role, department)
        const existing = await employeeModel.findOne({ email })
        if (existing) {
            return res.status(409).json({ message: "employee mail id already exists" })
        }
        return next();
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ message: "Something went wrong. Please try again later" })
    }

}

export const addEmployee = async (req, res) => {
    console.log("adding employee")
    try {
        const { email, employeeNumber, name, age, profileImage, description, role, department } = req.body
        console.log(email, employeeNumber, name, age, profileImage, description, role, department)
        const newDepartment = new employeeModel({
            email,
            name,
            age,
            profileImage,
            description,
            role,
            department
        })
        await newDepartment.save();
        return res.status(201).json({ message: 'Department added successfully' }, newDepartment);
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ message: "Something went wrong. Please try again later" })
    }
}


export const editEmployee = async (req, res) => {
    console.log("editing employee details")
    try {
        const { email, employeeNumber, name, age, profileImage, description, role, department } = req.body;

        const { _id } = req.params;
        console.log(_id)

        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    email, employeeNumber, name, age, profileImage, description, role, department
                },
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'employee not found' });
        }
        return res.status(200).json({ message: 'employee details updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later' });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { _id } = req.params;

        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            _id,
            { $set: { isDeleted: true } },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'employee not found' });
        }

        return res.status(200).json({ message: 'employee soft deleted successfully', department: updatedDepartment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later' });
    }
}