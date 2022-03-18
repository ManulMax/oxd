import {ref} from 'vue';
import {FormSchema, Model} from '../core/components/SchemaForm/types';

const generateModel = (rawSchema: FormSchema) => {
  const _model: Model = {};
  for (let x = 0; x < rawSchema.layout.length; x++) {
    const _layout = rawSchema.layout[x];
    if (!_layout.children || Array.isArray(_layout.children)) continue;
    for (const slot in _layout.children) {
      for (let y = 0; y < _layout.children[slot].length; y++) {
        const _field = _layout.children[slot][y];
        if (_field.type === 'button') continue;
        _model[_field.name] = _field.value;
      }
    }
  }
  return _model;
};

export default function useSchemaForm(rawSchema: FormSchema) {
  const schema = ref(rawSchema);
  const model = ref(generateModel(rawSchema));

  return {
    model,
    schema,
  };
}