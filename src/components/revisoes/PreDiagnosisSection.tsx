import React from 'react';
import { PreDiagnosisQuestion } from '../../types/revisoes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreDiagnosisSectionProps {
  questions: PreDiagnosisQuestion[];
  onUpdateQuestion: (questionId: string, resposta: string | boolean) => void;
  readonly?: boolean;
}

export const PreDiagnosisSection: React.FC<PreDiagnosisSectionProps> = ({
  questions,
  onUpdateQuestion,
  readonly = false
}) => {
  if (!questions || questions.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Pré-diagnóstico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-gray-900">{question.pergunta}</h4>
              {question.obrigatoria && (
                <span className="text-xs text-red-600 font-medium">* Obrigatória</span>
              )}
            </div>

            {!readonly && (
              <div>
                {question.tipo === 'sim_nao' && (
                  <RadioGroup
                    value={question.resposta?.toString() || ''}
                    onValueChange={(value) => onUpdateQuestion(question.id, value === 'true')}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id={`${question.id}-sim`} />
                      <Label htmlFor={`${question.id}-sim`}>Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id={`${question.id}-nao`} />
                      <Label htmlFor={`${question.id}-nao`}>Não</Label>
                    </div>
                  </RadioGroup>
                )}

                {question.tipo === 'texto' && (
                  <Textarea
                    placeholder="Digite sua resposta..."
                    value={question.resposta?.toString() || ''}
                    onChange={(e) => onUpdateQuestion(question.id, e.target.value)}
                    className="min-h-[80px]"
                  />
                )}

                {question.tipo === 'multipla_escolha' && question.opcoes && (
                  <Select
                    value={question.resposta?.toString() || ''}
                    onValueChange={(value) => onUpdateQuestion(question.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.opcoes.map((opcao, index) => (
                        <SelectItem key={index} value={opcao}>
                          {opcao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {readonly && question.resposta && (
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm text-gray-700">
                  {question.tipo === 'sim_nao' 
                    ? (question.resposta ? 'Sim' : 'Não')
                    : question.resposta.toString()
                  }
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};