// Import FS
const fs = require('fs')

//Object 
const people = [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
        },
        {
          id: 3,
          name: "Clementine Bauch",
          username: "Samantha",
          email: "Nathan@yesenia.net",
        },
        {
          id: 4,
          name: "Patricia Lebsack",
          username: "Karianne",
          email: "Julianne.OConner@kory.org",
        },
        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
        },
        {
          id: 6,
          name: "Mrs. Dennis Schulist",
          username: "Leopoldo_Corkery",
          email: "Karley_Dach@jasper.info",
        },
        {
          id: 7,
          name: "Kurtis Weissnat",
          username: "Elwyn.Skiles",
          email: "Telly.Hoeger@billy.biz",
        },
        {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          username: "Maxime_Nienow",
          email: "Sherwood@rosamond.me",
        },
        {
          id: 9,
          name: "Glenna Reichert",
          username: "Delphine",
          email: "Chaim_McDermott@dana.io",
        },
        {
          id: 10,
          name: "Clementina DuBuque",
          username: "Moriah.Stanton",
          email: "Rey.Padberg@karina.biz",
        },
      ];

// WriteFile
const setInitialData = () =>{
    fs.writeFile("people.txt", JSON.stringify(people), 'utf-8', (err)=>{
        if(err) console.log('Error Saving Data!')
        else console.log('Success Saving Data!')
    })
}
// ReadFile
const getData = (req, res) =>{
    fs.readFile("people.txt", 'utf-8', (err, data)=>{
    if (err) {
        console.log('Error Reading Data:', err);
    } else {
        res.end(data)
    }
    })
}

// Detail by Id to Object
const getDatabyId = (req,res,id) => {
  fs.readFile("people.txt", 'utf-8', (err, data) => {
    if (err) {
      console.log('Error Reading Data:', err);
  } else {
      const person = JSON.parse(data).find(row => row.id === id);
      if (person) {
          res.end(JSON.stringify(person))
        //   console.log(person);
      } else {
          res.end('Person not found')
        //   console.log('Person not found');
      }
  }
  })
}

// Delete by Id to Object
const deleteDatabyId = (req,res,id) => {
    fs.readFile("people.txt", 'utf-8', (err, data) => {
      if (err) {
        console.log('Error Reading Data:', err);
    } else {
        let people = JSON.parse(data)
        const index = people.findIndex(row => row.id === id);
        if (index !== -1) {
            // menghapus
            const deletedPerson = people.splice(index, 1)[0];

            // Menulis file baru setelah dihapus
            fs.writeFile("people.txt", JSON.stringify(people), 'utf-8', (err)=>{
                if(err) console.log('Error Saving Data!')
                else res.end(JSON.stringify(people))
                // else console.log('Success Saving Data!')
            })
        } else {
            res.end('Person not found')
            console.log('Person not found');
        }
    }
    })
  }

// Get Data by Name to Array
const getDatabyName = () =>{
  fs.readFile("people.txt", 'utf-8', (err, data)=>{
    if (err) {
        console.log('Error Reading Data:', err);
    } else {
        const parsed = JSON.parse(data);
        console.log(parsed.map(row => row.name))
    }
    })
}

// Add Data
const addData = (payload) => {
  fs.readFile("people.txt", 'utf-8', (err, data)=>{
    if (err) {
        console.log('Error Reading Data:', err);
    } else {
      const parsed = JSON.parse(data);
      parsed.push(payload)

      fs.writeFile("people.txt", JSON.stringify(parsed), 'utf-8', (err)=>{
        if(err) console.log('Error Saving Data!')
        else console.log(parsed)
    })
    }

    })
}

module.exports = {people, setInitialData, getData, getDatabyId, getDatabyName, addData, deleteDatabyId}

