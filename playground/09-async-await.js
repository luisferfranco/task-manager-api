require("../src/db/mongoose");
const User = require("../src/models/user");

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("62295e61cf613a2a98d34e10", 10)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => console.log(err));
