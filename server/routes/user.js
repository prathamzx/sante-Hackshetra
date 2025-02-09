const router = require('express').Router();
const isAuth = require('../middleware/auth');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctors');
const Hospital = require('../models/Hospital');

//Update USER TYPE (PATCH)

router.patch('/', isAuth, async (req, res) => {
    const type = req.query.type;
    console.log(type)

    try {

        const user = await User.findById({
            _id: req.user
        });
        console.log(user)
        if (!user) {
            return res.status(402).json({
                msg: 'User not found'
            })
        }

        user.userType = type;
        await user.save();
        console.log(user)
        return res.status(200).json({
            user
        })


    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }

})


//add new Patient

router.post('/patient', isAuth, async (req, res) => {
    const {
        name,
        contact,
        age,
        sex,
        cp,
        trestbps,
        chol,
        fbs,
        restecg,
        thalach,
        exang,
        oldpeak,
        slope,
        ca,
        thal,
        target,
        hospital,
        phone,
        address
    } = req.body;
    try {
        const newPatient = new Patient({
            name,
            contact,
            age,
            sex,
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal,
            target,
            hospital,
            phone,
            address
        })

        await newPatient.save();

        return res.status(200).json(newPatient);
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//remove patient
router.delete('/patient', isAuth, async () => {
    const patientId = req.query.id;

    try {
        await Patient.findByIdAndDelete({
            _id: patientId
        })

        return res.status(200).json({
            deletedPatient: patientId
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})

// create Doctor ()

router.post('/doctor', isAuth, async (req, res) => {
    const {
        phone,
        address,
        specialization
    } = req.body;

    try {
        const newDoctor = new Doctor({
            phone,
            address,
            specialization
        })

        await newDoctor.save();

        return res.status(200).json(newDoctor)
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }

})


// create Hospital

router.post('/hospital', isAuth, async (req, res) => {
    const {
        phone,
        address,
        hospitalName
    } = req.body;

    try {
        const newHospital = new Doctor({
            phone,
            address,
            hospitalName
        })

        await newHospital.save();

        return res.status(200).json(newHospital)
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }

})

//get all patience of hospital

router.get('/hospital', isAuth, async (req, res) => {
    const hospital = req.query.hospital;

    try {
        const patients = await Patient.find({
            hospital
        });

        return res.status(200).json(patients)
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//get all patience of a doctor
router.get('/doctor', isAuth, async (req, res) => {
    const doctor = req.query.doctor;

    try {
        const patients = await Patient.find({
            doctor
        });

        return res.status(200).json(patients)
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})



module.exports = router;


//template
// router.get('/doctor',isAuth,async(req,res)=>{
//     const hospital = req.query.hospital;

//     try {

//     } catch (error) {
//         res.status(500).json({
//             msg: 'Server Error'
//         })
//     }
// })