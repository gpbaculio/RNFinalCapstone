export const imageVariants = {
  defaults: {},
  profileImgSection: {
    mt: 'xxs',
    width: 60,
    height: 60,
    borderRadius: 60,
  },
};

export const colors = {
  '#61DAFB': '#61DAFB',
  '#FB61DA': '#FB61DA',
  '#DAFB61': '#DAFB61',
  '#61FBCF': '#61FBCF',
  '#495E57': '#495E57',
  '#F4CE14': '#F4CE14',
  '#000000': '#000000',
  '#FFFFFF': '#FFFFFF',
  '#EDEFEE': '#EDEFEE',
  '#EE9972': '#EE9972',
  '#333333': '#333333',
  '#D9D9D9': '#D9D9D9',
  '#FBDABB': '#FBDABB',
  '#AFAFAF': '#AFAFAF',
  red: 'red',
  '#57B87D': '#57B87D',
  overlay: 'rgba(0,0,0,0.5)',
};

export const spacing = {
  xxxs: 4,
  xxs: 6,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xL: 24,
  xxL: 28,
  40: 40,
  10: 10,
  auto: 'auto',
};

export const buttonVariants = {
  defaults: {},
  buttonPrimary: {
    borderRadius: spacing['xs'],
    paddingVertical: 's',
    backgroundColor: colors['#495E57'],
    alignItems: 'center',
  },
  button: {
    paddingVertical: 's',
    paddingHorizontal: 'xL',
    borderRadius: 8,
    alignItems: 'center',
  },
};

export const containerVariants = {
  defaults: {},
  header: {
    backgroundColor: colors['#495E57'],
    paddingTop: 40,
    paddingBottom: 'l',
  },
  container: {
    flex: 1,
    paddingHorizontal: 'xxL',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImgSection: {
    mt: 'xxs',
    width: 60,
    height: 60,
    borderRadius: 60,
  },
};

export const textVariants = {
  defaults: {},
  header: {
    color: colors['#FFFFFF'],
    fontSize: 24,
    fontWeight: '600',
    paddingTop: 's',
  },
  buttonText: {
    color: colors['#FFFFFF'],
    fontSize: 16,
    fontWeight: '500',
  },
  formLabel: {
    color: '#495E57',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 's',
  },
  input: {
    borderWidth: 1,
    paddingVertical: 's',
    width: '100%',
    paddingHorizontal: 'xL',
    borderRadius: 8,
  },
  profileInputLabel: {
    mr: 'auto',
    mb: 'xxxs',
    fontWeight: '600',
    color: '#333333',
    fontSize: 12,
    mt: 'xs',
  },
  profileInput: {
    borderWidth: 1,
    paddingVertical: 'xxxs',
    width: '100%',
    paddingHorizontal: 's',
    borderRadius: 8,
  },
  error: {
    color: 'red',
  },
  profileLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
};
