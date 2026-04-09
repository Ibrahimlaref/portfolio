// pages/Home/sections/ContactSection.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContact } from '@/hooks/useContact';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toast } from '@/components/ui/toast';
import { Github, Linkedin, Mail, Loader2 } from 'lucide-react';

const ContactSection = () => {
  const { t } = useTranslation('contact');
  const ref = useScrollReveal();
  const { sendMessage, loading, error } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage(formData);
      setToastMessage(t('success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setToastMessage(error || t('error'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={ref} className="text-center mb-12 reveal">
        <h2 className="text-4xl font-space-grotesk font-bold text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-300">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div ref={ref} className="reveal">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                name="name"
                placeholder={t('placeholders.name')}
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-[#0D1117] border-gray-600 text-white"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder={t('placeholders.email')}
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-[#0D1117] border-gray-600 text-white"
              />
            </div>
            <div>
              <Input
                name="subject"
                placeholder={t('placeholders.subject')}
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-[#0D1117] border-gray-600 text-white"
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder={t('placeholders.message')}
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-[#0D1117] border-gray-600 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('sending')}
                </>
              ) : (
                t('send')
              )}
            </Button>
          </form>
        </div>

        <div ref={ref} className="reveal">
          <div className="space-y-6">
            <div className="glass rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">{t('social.title')}</h3>
              <div className="space-y-4">
                <a
                  href="https://github.com/Ibrahimlaref"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/laref-ibrahim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:i.laref@esi-sba.dz"
                  className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>i.laref@esi-sba.dz</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <Toast>
          <div className="text-white">{toastMessage}</div>
        </Toast>
      )}
    </div>
  );
};

export default ContactSection;