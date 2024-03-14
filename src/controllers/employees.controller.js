import { pool } from "../db.js";

export const getEmployees = async(req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }

    
};

export const getEmployee = async(req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM employee where id=?', [req.params.id]);
        console.log(req.params.id);
        
        if(rows.length <=0) return res.status(404).json({
            message: 'Employee not found'
        })
        
        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }

}

export const createEmployees = async(req, res) => {

    try {
        const {name, salary} = req.body;
        const [rows] = await pool.query('INSERT INTO employee (name, salary) values (?, ?)', [name, salary]);
        
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }

    
}

export const updateEmployees = async(req, res)=>{


    try {
        const {id} = req.params;   //es lo mismo que poner   const id = req.params.id
        const { name, salary} = req.body;

        //con put se actualiza todo
        //const [result] = await pool.query('UPDATE employee set name=?, salary=? WHERE id=?', [name, salary, id]);

        //con patch ciertos campos pueden editarse
        const [result] = await pool.query('UPDATE employee set name= IFNULL(?, name), salary=IFNULL(?, salary) WHERE id=?', [name, salary, id]);

        
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Employee not found'
        });

        const [rows] = await pool.query('SELECT * FROM employee where id=?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }

}

export const deleteEmployees = async(req, res) => {

    try {
        const [result] = await pool.query('DELETE FROM employee where id=?', [req.params.id]);
        console.log(req.params.id);
        
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }

    
}