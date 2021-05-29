const data = require("../data/student.json");

const Query = {
    Query: {
        greetings: () => {
            return "Hello world graphql";
        },

        students: () => {
            return data;
        },
        studentsbyId: (root, args, context, info) => {
            return data.students.get(args.id);             
         }
    }
};

const Student = {
    Query: {
        fullName: (root, args, context, info) => {
            return root.firstName + ":" + root.lastName;
    
        }
    }
}


module.exports = { Query, Student };
