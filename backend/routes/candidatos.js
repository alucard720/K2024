const candidatos = require("../models/candidato.user");

getCandidatos = async (req, res) => {
  await candidatos
    .find({}, (err, candidatos) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!candidatos.length) {
        return res
          .status(400)
          .json({ success: false, error: "item not found" });
      }
      return res.status(200).json({ success: true, data: candidatos });
    })
    .catch((err) => console.log(err));
};

module.exports = { getCandidatos };
