import React, { useState } from 'react';
import { Plus, FileText, Image, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import type { InstructionPage, InstructionStep, Property } from './types';

interface InstructionPageManagerProps {
  pages: InstructionPage[];
  properties: Property[];
  onAddPage: (page: Omit<InstructionPage, 'id' | 'created_at'>) => void;
}

const InstructionPageManager: React.FC<InstructionPageManagerProps> = ({
  pages,
  properties,
  onAddPage,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    property_id: '',
    title: '',
    steps: [] as Omit<InstructionStep, 'id'>[],
  });

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        {
          step_number: formData.steps.length + 1,
          title: '',
          description: '',
          image_url: '',
        },
      ],
    });
  };

  const removeStep = (index: number) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    // Renumber steps
    const renumberedSteps = newSteps.map((step, i) => ({
      ...step,
      step_number: i + 1,
    }));
    setFormData({ ...formData, steps: renumberedSteps });
  };

  const updateStep = (index: number, field: keyof InstructionStep, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData({ ...formData, steps: newSteps });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...formData.steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      // Renumber steps
      const renumberedSteps = newSteps.map((step, i) => ({
        ...step,
        step_number: i + 1,
      }));
      setFormData({ ...formData, steps: renumberedSteps });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const pageData: Omit<InstructionPage, "id" | "created_at"> = {
      ...formData,
      steps: formData.steps.map((step, i) => ({
        ...step,
        id: `${Date.now()}-${i}`, // temporary id, or leave it to backend
      })),
    };
  
    onAddPage(pageData);
    setFormData({ property_id: '', title: '', steps: [] });
    setShowForm(false);
  };

  const getPropertyName = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : 'Unknown Property';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Instruction Pages</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Page</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create Instruction Page</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property
                </label>
                <select
                  required
                  value={formData.property_id}
                  onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter page title"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-medium text-gray-900">Steps</h4>
                <button
                  type="button"
                  onClick={addStep}
                  className="inline-flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Step</span>
                </button>
              </div>

              {formData.steps.map((step, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Step {step.step_number}
                    </span>
                    <div className="flex space-x-2">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => moveStep(index, 'up')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                      )}
                      {index < formData.steps.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveStep(index, 'down')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Step Title
                    </label>
                    <input
                      type="text"
                      required
                      value={step.title}
                      onChange={(e) => updateStep(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter step title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      value={step.description}
                      onChange={(e) => updateStep(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter step description"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={step.image_url || ''}
                      onChange={(e) => updateStep(index, 'image_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              ))}

              {formData.steps.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No steps added yet. Click "Add Step" to get started.</p>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={formData.steps.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Page
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {pages.map((page) => (
          <div key={page.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{page.title}</h3>
                <p className="text-sm text-gray-500">
                  Property: {getPropertyName(page.property_id)} • {page.steps.length} steps
                </p>
              </div>
              <span className="text-xs text-gray-400">
                ID: {page.id}
              </span>
            </div>
            
            <div className="space-y-3">
              {page.steps.map((step) => (
                <div key={step.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {step.step_number}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    {step.image_url && (
                      <div className="flex items-center space-x-1 mt-2 text-xs text-green-600">
                        <Image className="h-3 w-3" />
                        <span>Has image</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {pages.length === 0 && !showForm && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No instruction pages yet</h3>
          <p className="text-gray-500 mb-4">Create detailed step-by-step check-in guides.</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Page</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructionPageManager;