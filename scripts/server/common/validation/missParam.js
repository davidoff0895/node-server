module.exports = (query, requiredParams) => {

  const validate = (vQuery, vRequiredParams, kayName) => {

    for (let key of vRequiredParams) {
      const vKey = key.name || key;
      if (!vQuery[vKey] || typeof vQuery[vKey] !== typeof key)
        return key.name ? `[${key.params}] in ${vKey}` : `${vKey} in ${kayName}`;
      if (typeof key === 'object') {
        const validateChild = validate(vQuery[vKey], key.params, key.name);
        if (validateChild) return validateChild;
      }
    }
    return null
  };
  return validate(query, requiredParams, 'request');
};
