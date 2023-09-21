import { POOL } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await POOL.query("select * from employee");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await POOL.query("select * from employee where id =?", [
      req.params.id,
    ]);
    console.log(rows);

    if (rows.length <= 0)
      return res.status(404).json({ message: "Employee not found" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await POOL.query(
      "insert into employee (name, salary) VALUES(?,?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await POOL.query("delete from employee where id= ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Employee not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await POOL.query(
      "update employee set name=IFNULL(?,name), salary=IFNULL(?,salary) where id=?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await POOL.query("select * from employee where id=?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
